import { db } from "~/server/db";

import { type NextApiRequest, type NextApiResponse } from "next";
import { eq } from "drizzle-orm";
import { type Users, users } from "~/server/db/schema";

export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { name, surname, email, section, uuid, role } = req.body as Users;

  if (!name || !surname || !email || !section || !uuid || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await db
      .insert(users)
      .values({ name, surname, email, section, uuid, role })
      .returning();
    res.status(200).json({ message: "User created successfully", result });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to create user: ${(error as Error).message}` });
  }
};

export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await db.query.users.findMany();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Valid user ID is required" });
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.uuid, id),
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { id } = req.query;
  const { fav, name, surname, email, section, role } = req.body as Users;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Valid user ID is required" });
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.uuid, id),
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = await db
      .update(users)
      .set({ fav, name, surname, email, section, role })
      .where(eq(users.uuid, id))
      .returning();

    res
      .status(200)
      .json({ message: "User favorite updated successfully", result });
  } catch (error) {
    console.error("Error updating user favorite:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { id } = req.body as Users;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Valid user ID is required" });
  }

  try {
    const result = await db.delete(users).where(eq(users.uuid, id)).returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", result });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to delete user: ${(error as Error).message}` });
  }
};
