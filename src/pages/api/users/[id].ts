import { type NextApiRequest, type NextApiResponse } from "next";
import { getUserById } from "../users";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return getUserById(req, res);
  }
  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}