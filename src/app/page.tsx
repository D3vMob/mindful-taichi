import dynamic from "next/dynamic";
import { CreateComment } from "~/components/editor/createComment";
import { UpdateComment } from "~/components/editor/updateComment";
import { getPosts } from "~/server/postsQeries";
import Image from "next/image";
import HeadImage from "../assets/images/head_image.jpg";

const DeleteComment = dynamic(
  () => import("~/components/editor/deleteComment"),
  { ssr: false },
);

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="">
      <div className="relative hidden justify-center bg-black md:flex">
        <Image
          priority
          src="../assets/quotes/hara_hachibunme.svg"
          className="absolute left-48 top-10"
          alt="quote"
        />
        <Image
          src={HeadImage}
          alt="Main logo"
          className=""
          style={{
            maskImage:
              "linear-gradient(to right, transparent 10%, black 40%, black 60%, transparent 90%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 10%, black 40%, black 60%, transparent 90%)",
          }}
        />
      </div>
      <CreateComment />
      <div className="bg-background px-4 md:px-40">
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
    </div>
  );
}
