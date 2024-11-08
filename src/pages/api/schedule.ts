import type { NextApiRequest, NextApiResponse } from "next";
import { getSchedule } from "~/server/scheduleQueries";
import { createScheduleAPI, updateScheduleAPI } from "./scheduleApi";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return getSchedule();
  } else if (req.method === "POST") {
    return createScheduleAPI(req, res);
  } else if (req.method === "PUT") {
    return updateScheduleAPI(req, res);
  }
}
