import { type NextApiRequest, type NextApiResponse } from "next";
import { createUserFirebase } from "~/lib/firebase/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email } = req.body as {
      email: string;
    };

    try {
      const user = await createUserFirebase(email);
      return res.status(200).json({ user });
    } catch (error) {
      console.error("Error creating user: ", error);
      return res.status(500).json({ error: "Failed to create user" });
    }
  }
}
