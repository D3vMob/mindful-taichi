import { type NextApiRequest, type NextApiResponse } from "next";
import { createPostAPI, deletePost, updatePost } from "./postsApi";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return createPostAPI(req, res);
  } else if (req.method === "PUT") {
    return updatePost(req, res);
  } else if (req.method === "DELETE") {
    return deletePost(req, res);
  } else {
    res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
