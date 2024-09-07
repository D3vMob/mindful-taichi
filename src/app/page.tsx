import { db } from "~/server/db";


export default async function HomePage() {

  const posts = await db.query.users.findMany();

  return (
      <div className="bg-gray-100 px-4 grow content-center text-center">
        hey {posts.map(post => post.name + ", ")}
        This is Mindful TaiChi website!
      </div>
  );
}
