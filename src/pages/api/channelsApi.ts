import { eq } from "drizzle-orm";
import { type NextApiRequest, type NextApiResponse } from "next";
import { db } from "~/server/db";
import { channels, type InsertChannel } from "~/server/db/schema";

export const createChannel = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { name, shortName, description, active, playlistId } =
    req.body as InsertChannel;

  if (!name || !shortName || !description || !active || !playlistId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await db
      .insert(channels)
      .values({ name, shortName, description, active, playlistId })
      .returning();
    res.status(200).json({ message: "Channel created successfully", result });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to create channel: ${(error as Error).message}` });
  }
};

export const updateChannel = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { id } = req.query;
  const { name, shortName, description, active, playlistId } =
    req.body as InsertChannel;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Valid channel ID is required" });
  }

  try {
    const channel = await db.query.channels.findFirst({
      where: eq(channels.id, Number(id)),
    });

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    const result = await db
      .update(channels)
      .set({ name, shortName, description, active, playlistId })
      .where(eq(channels.id, Number(id)))
      .returning();

    res.status(200).json({ message: "Channel updated successfully", result });
  } catch (error) {
    console.error("Error updating channel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getChannelById = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Valid channel ID is required" });
  }

  try {
    const channel = await db.query.channels.findFirst({
      where: eq(channels.id, Number(id)),
    });

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    res.status(200).json({ channel });
  } catch (error) {
    console.error("Error fetching channel by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
