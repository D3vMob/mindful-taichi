import dynamic from "next/dynamic";
import { CreateComment } from "~/components/editor/createComment";
import { UpdateComment } from "~/components/editor/updateComment";
import { getPosts } from "~/server/postsQeries";

const DeleteComment = dynamic(
  () => import("~/components/editor/deleteComment"),
  { ssr: false },
);

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <>
      <CreateComment />
      <div className="grow content-start divide-y-2 bg-background px-4 md:px-40">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col gap-2 md:px-16">
            <div className="flex cursor-pointer justify-end gap-1 pe-8 pt-2">
              <UpdateComment postId={post.id} />
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
