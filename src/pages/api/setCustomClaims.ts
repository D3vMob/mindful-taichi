import { type NextApiRequest, type NextApiResponse } from "next";
import {
  revokeRefreshTokens,
  setCustomUserClaims,
} from "~/lib/firebase/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { uid, claims } = req.body as {
      uid: string;
      claims: { role: string };
    };

    try {
      // Set custom user claims
      console.log("UID SSR:", uid);
      console.log("CLAIMS SSR:", claims);
      await setCustomUserClaims(uid, claims);

      // Optionally, force a token refresh to apply the claims immediately
      await revokeRefreshTokens(uid);

      return res
        .status(200)
        .json({ message: "Custom claims set successfully" });
    } catch (error) {
      console.error("Error setting custom claims: ", error);
      return res.status(500).json({ error: "Failed to set custom claims" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
