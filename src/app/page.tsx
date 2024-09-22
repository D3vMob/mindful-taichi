import { db } from "~/server/db";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Pencil } from "lucide-react";

const DeleteComment = dynamic(
  () => import("~/components/tipTap/deleteComment"),
  { ssr: false },
);

export default async function HomePage() {
  const posts = await db.query.posts.findMany({
    orderBy: (posts, { asc }) => [asc(posts.id)],
  });

  return (
    <>
      <Link href={"/editor"}>
        <div className="z-50 opacity-75 fixed right-4 bottom-4 cursor-pointer select-none rounded-full border border-gray-300 bg-white px-6 py-4 text-lg font-bold shadow-md md:hover:bg-gray-100 md:hover:text-gray-900">
          +
        </div>
      </Link>

      <div className="grow content-start divide-y-2 bg-gray-100 px-4 md:px-40">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col gap-2 md:px-16">
            <div className="flex cursor-pointer justify-end gap-1 pe-8 pt-2">
              <Link href={`/editor/${post.id}`}>
                <Pencil size={18} className="hover:text-gray-400" />
              </Link>

              <DeleteComment postId={post.id} />
            </div>
            <div
              className="ProseMirror px-6 py-4"
              style={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
