import dynamic from "next/dynamic";
import { CreateComment } from "~/components/editor/createComment";
import { UpdateComment } from "~/components/editor/updateComment";
import { HeadBanner } from "~/components/headBanner";
import Inquiry from "~/components/home/inquiry";
import { UpdateSchedule } from "~/components/home/updateSchedule";
import { getPosts } from "~/server/postsQeries";
import { getSchedule } from "~/server/scheduleQueries";
import Image from "next/image";

const DeleteComment = dynamic(
  () => import("~/components/editor/deleteComment"),
  { ssr: false },
);

export default async function HomePage() {
  const posts = await getPosts();
  const schedule = await getSchedule();

  return (
    <div>
      <HeadBanner />
      <CreateComment />
      <div className="md:min-w-screen md:flex">
        <div className="bg-background px-4 md:w-4/5">
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
        <div className="relative bg-foreground/20 px-2 pb-4 pt-4 md:w-1/5">
          {schedule && (
            <>
              <div className="absolute right-4 top-6">
                <UpdateSchedule scheduleId={schedule.id} />
              </div>
              <div>
                <h4 className="text-center text-2xl font-bold">日程</h4>
                <div
                  className="ProseMirror px-6 py-4"
                  style={{ whiteSpace: "pre-line" }}
                  dangerouslySetInnerHTML={{ __html: schedule?.content ?? "" }}
                />
              </div>
              <hr className="py-2" />
            </>
          )}
          <Inquiry />
          <div className="flex justify-center pt-4">
            <Image src="/icon.png" alt="Main logo" width={200} height={200} />
          </div>
        </div>
      </div>
    </div>
  );
}
