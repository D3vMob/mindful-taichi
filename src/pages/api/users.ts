import { db } from "~/server/db";

import { type NextApiRequest, type NextApiResponse } from 'next';
import { eq } from "drizzle-orm";
import { users } from "~/server/db/schema";

export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await db.query.users.findMany();
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Valid user ID is required' });
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.uuid, id),
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

