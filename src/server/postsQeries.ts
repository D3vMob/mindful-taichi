import "server-only";

import { db } from "./db";
import { type Posts, type InsertPost } from "./db/schema";
import { posts } from "./db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function getPosts() {
  const posts = db.query.posts.findMany({
    orderBy: (posts, { desc }) => [desc(posts.id)],
  });
  return posts;
}

export async function getPostById(id: number) {
  const post = await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  return post;
}

export async function createPost(post: InsertPost) {
  const newPost = await db.insert(posts).values(post);
  return newPost;
}

export async function updatePost(id: number, post: Posts) {
  await db.update(posts).set(post).where(eq(posts.id, id)).returning();
  redirect("/");
}

export async function deletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id));
  redirect("/");
}
