import Post from "~/components/editor/NotePicker";
import { db } from "~/server/db";
export default async function EditorPage({params}: {params: {postSlug: string}}) {
  const postText = await db.query.posts.findMany({ where: (posts, {eq}) => eq(posts.id, parseInt(params.postSlug)) });
  return (
    <>
      <Post post={postText[0]?.content} postId={parseInt(params.postSlug)} />
    </>
  );
}
