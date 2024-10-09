import "server-only";

import { db } from "./db";

import { type InsertChannel, channels, type Channels } from "./db/schema";
import { eq } from "drizzle-orm";

export async function getAllPlaylists() {
  const channels = await db.query.channels.findMany({
    orderBy: (channels, { asc }) => [asc(channels.createdAt)],
  });
  return channels;
}

export async function getChannelById(id: number) {
  const channel = await db.query.channels.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  return channel;
}

export async function createChannel(channel: InsertChannel) {
  const newChannel = await db.insert(channels).values(channel);
  return newChannel;
}

export async function updateChannel(channel: Channels, channelId: number) {
  const updatedChannel = await db
    .update(channels)
    .set(channel)
    .where(eq(channels.id, channelId))
    .returning();
  return updatedChannel;
}

export async function deleteChannel(channelId: number) {
  const deletedChannel = await db
    .delete(channels)
    .where(eq(channels.id, channelId));
  return deletedChannel;
}

export async function activateChannel(channelId: number, activity: boolean) {
  const updatedChannel = await db
    .update(channels)
    .set({ active: !activity })
    .where(eq(channels.id, channelId))
    .returning();
  return updatedChannel;
}

export async function deactivateChannel(channelId: number) {
  const updatedChannel = await db
    .update(channels)
    .set({ active: false })
    .where(eq(channels.id, channelId))
    .returning();
  return updatedChannel;
}
