import { eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { type InsertSchedule, schedule } from "~/server/db/schema";
export const getScheduleByIdAPI = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Valid post ID is required" });
  }
  const scheduleId = parseInt(id, 10);
  if (isNaN(scheduleId)) {
    return res.status(400).json({ error: "Invalid schedule ID format" });
  }
  try {
    const result = await db.query.schedule.findFirst({
      where: eq(schedule.id, scheduleId),
    });
    if (!result) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.status(200).json({ message: "Schedule fetched successfully", result });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to fetch schedule: ${(error as Error).message}` });
  }
};
export const createScheduleAPI = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const { content } = req.body as InsertSchedule;
  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }
  try {
    const result = await db.insert(schedule).values({ content }).returning();
    res.status(200).json({ message: "Schedule created successfully", result });
  } catch (error) {
    res.status(500).json({
      error: `Failed to create schedule: ${(error as Error).message}`,
    });
  }
};
export const updateScheduleAPI = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const { id, content, imgUrl } = req.body as InsertSchedule;
  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }
  try {
    const result = await db
      .update(schedule)
      .set({ content, imgUrl })
      .where(eq(schedule.id, id!))
      .returning();
    res.status(200).json({ message: "Post updated successfully", result });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to update post: ${(error as Error).message}` });
  }
};
