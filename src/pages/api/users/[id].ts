import { type NextApiRequest, type NextApiResponse } from "next";
import { createUser, deleteUser, getUserById, updateUser } from "../users";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return getUserById(req, res);
  } else if (req.method === "PUT") {
    return updateUser(req, res);
  } else if (req.method === "DELETE") {
    return deleteUser(req, res);
  } else if (req.method === "POST") {
    return createUser(req, res);
  }
  res.setHeader("Allow", ["POST", "PUT", "DELETE", "GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
