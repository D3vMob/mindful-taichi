import type { NextApiRequest, NextApiResponse } from "next";
import { getScheduleByIdAPI } from "../scheduleApi";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return getScheduleByIdAPI(req, res);
  }
  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
