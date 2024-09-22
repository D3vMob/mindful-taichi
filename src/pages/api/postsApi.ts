import { eq } from "drizzle-orm";
import { type NextApiRequest, type NextApiResponse } from "next";
import { db } from "~/server/db";
import { type Posts, type InsertPost } from "~/server/db/schema";
import { posts } from "~/server/db/schema";

type Data = {
  message?: string;
  result?: InsertPost[];
  error?: string;
};

export const getPostByIdAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Valid post ID is required" });
  }

  const postId = parseInt(id, 10);

  if (isNaN(postId)) {
    return res.status(400).json({ error: "Invalid post ID format" });
  }

  try {
    const result = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
    });
    
    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post fetched successfully", result });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to fetch post: ${(error as Error).message}` });
  }
};

export async function createPostAPI(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { content, imgUrl } = req.body as InsertPost;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const result = await db
      .insert(posts)
      .values({ content, imgUrl })
      .returning();
    res.status(200).json({ message: "Post created successfully", result });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to create post: ${(error as Error).message}` });
  }
}

export async function updatePost(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { id, content, imgUrl } = req.body as InsertPost;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const result = await db
      .update(posts)
      .set({ content, imgUrl })
      .where(eq(posts.id, id!))
      .returning();
    res.status(200).json({ message: "Post updated successfully", result });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to update post: ${(error as Error).message}` });
  }
}

export async function deletePost(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { id } = req.body as Posts;

  if (!id || typeof id !== "number") {
    return res.status(400).json({ error: "Valid post ID is required" });
  }

  try {
    const result = await db.delete(posts).where(eq(posts.id, id)).returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", result });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to delete post: ${(error as Error).message}` });
  }
}
