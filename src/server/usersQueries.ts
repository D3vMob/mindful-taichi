import "server-only";

import { db } from "./db";
import { type InsertUser, users, type Users } from "./db/schema";
import { eq } from "drizzle-orm";

export async function getAllUsers() {
  const users = await db.query.users.findMany({
    orderBy: (users, { asc }) => [asc(users.createdAt)],
  });
  return users;
}

export async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.email, email),
  });
  return user;
}

export async function getUserById(uuid: string) {
  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.uuid, uuid),
  });

  return user;
}

export async function createUser(user: InsertUser) {
  const newUser = await db.insert(users).values(user);
  return newUser;
}

export async function updateUser(user: Users, userId: string) {
  const updatedUser = await db
    .update(users)
    .set(user)
    .where(eq(users.uuid, userId))
    .returning();
  return updatedUser;
}

export async function deleteUser(userId: string) {
  const deletedUser = await db.delete(users).where(eq(users.uuid, userId));
  return deletedUser;
}
