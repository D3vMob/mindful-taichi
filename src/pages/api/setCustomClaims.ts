import { type NextApiRequest, type NextApiResponse } from "next";
import {
  revokeRefreshTokens,
  setCustomUserClaims,
} from "~/lib/firebase/firebaseAdmin";
import { type UserClaims } from "~/types/auth";
import { z } from "zod";

const claimsSchema = z.object({
  uid: z.string(),
  claims: z.object({
    role: z.string(),
  }),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { uid, claims } = claimsSchema.parse(req.body);

    // Set custom user claims
    await setCustomUserClaims(uid, claims);

    // Force a token refresh
    await revokeRefreshTokens(uid);

    return res.status(200).json({ message: "Custom claims set successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0]?.message });
    }
    console.error("Error setting custom claims:", error);
    return res.status(500).json({ error: "Failed to set custom claims" });
  }
}
