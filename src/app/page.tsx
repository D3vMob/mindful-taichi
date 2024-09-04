import { db } from "~/server/db";


export default async function HomePage() {

  const posts = await db.query.posts.findMany();

  return (
    <main className="flex grow min-h-screen items-center justify-center bg-gray-100 text-gray-900">
      <div>
        hey {posts.map(post => post.name + ", ")}
        This is Mindful TaiChi website!
      </div>
    </main>
  );
}
