import { type NextApiRequest, type NextApiResponse } from "next";
import { createUser } from "./usersApi";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return createUser(req, res);
  } else {
    res.setHeader("Allow", ["POST", "PUT", "DELETE", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
