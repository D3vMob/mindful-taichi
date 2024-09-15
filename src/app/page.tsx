import { db } from "~/server/db";

import { SafeHtmlRender } from "~/components/tipTap/SafeHtmlRender";
import dynamic from "next/dynamic";
import { revalidatePath } from "next/cache";

const TipTap = dynamic(() => import("~/components/tipTap/TipTap"), {
  ssr: false,
});
const DeleteComment = dynamic(
  () => import("~/components/tipTap/deleteComment"),
  { ssr: false },
);

// Server action to refresh the page
async function refreshPosts() {
  'use server'
  revalidatePath('/');
}

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  return (
    <div className="grow content-start divide-y-2 bg-gray-100 px-4 text-center md:px-40">
      {posts.map((post) => (
        <div key={post.id} className="flex flex-col gap-2 md:px-16">
          <div className="flex cursor-pointer justify-end gap-1 pe-8 pt-2">
            <TipTap postId={post.id} toCreate={false} refreshPosts={refreshPosts} />
            <DeleteComment postId={post.id} refreshPosts={refreshPosts} />
          </div>
          <SafeHtmlRender content={post.content} />
        </div>
      ))}
      <TipTap toCreate={true} refreshPosts={refreshPosts} />
    </div>
  );
}
