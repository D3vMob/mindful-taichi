import "server-only";

import { db } from "./db";
import { type InsertPost } from "./db/schema";
import { posts } from "./db/schema";



export async function getPosts() {
  const posts = await db.query.posts.findMany();
  return posts;
}

export async function getPostById(id: number) {
  const post = await db.query.posts.findFirst({
    where: (model, {eq}) => eq(model.id, id),
  });
  return post;
}

export async function createPost(post: InsertPost) {
  const newPost = await db.insert(posts).values(post);
  return newPost;
}

// export async function updatePost(id: number, post: Posts) {
//   await db.update(posts);
//   redirect("/");
// }

// export async function deletePost(id: number) {
//     await db.query.posts.delete({
//   redirect("/");
// }