import { type NextApiRequest, type NextApiResponse } from "next";
import { deleteUser, getUserById, updateUser } from "../usersApi";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return getUserById(req, res);
  } else if (req.method === "PUT") {
    return updateUser(req, res);
  } else if (req.method === "DELETE") {
    return deleteUser(req, res);
  } 
  res.setHeader("Allow", ["POST", "PUT", "DELETE", "GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
