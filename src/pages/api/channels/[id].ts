import { type NextApiRequest, type NextApiResponse } from "next";
import { getChannelById, updateChannel } from "../channelsApi";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return getChannelById(req, res);
  } else if (req.method === "PUT") {
    return updateChannel(req, res);
  }
  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
