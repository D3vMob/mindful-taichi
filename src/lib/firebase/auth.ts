import { type User } from "firebase/auth";
import { updateProfile } from "firebase/auth";

export const updateUserPhoto = async (user: User, url: string) => {
  try {
    await updateProfile(user, {
      photoURL: url,
    });
  } catch (error) {
    console.error("Error updating user photo:", error);
  }
};

export const updateUserName = async (user: User, name: string) => {
  try {
    await updateProfile(user, {
      displayName: name,
    });
  } catch (error) {
    console.error("Error updating user name:", error);
  }
};

// client-side function to request setting custom claims
type Result = {
  message: string;
  error: string;
};

export async function setCustomClaim(uid: string, claims: { role: string }) {
  const response = await fetch("/api/setCustomClaims", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid, claims }),
  });

  const result = (await response.json()) as Result;
  if (response.ok) {
    console.log(result.message); // Handle success
  } else {
    console.error(result.error); // Handle error
  }
}
