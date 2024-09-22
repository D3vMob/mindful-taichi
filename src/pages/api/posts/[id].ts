import { type NextApiRequest, type NextApiResponse } from "next";
import { getPostByIdAPI } from "../postsApi";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return getPostByIdAPI(req, res);
  }
  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}