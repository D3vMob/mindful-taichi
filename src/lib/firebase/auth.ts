import { type User } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { type UserRecord } from "node_modules/firebase-admin/lib/auth/user-record";

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
export type Result = {
  user: { reset: string; verify: string; user: UserRecord };
  message: string;
  error: string;
};

export async function handleCustomClaim(uid: string, claims: { role: string }) {
  const response = await fetch("/api/setCustomClaims", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid, claims }),
  });

  const result = (await response.json()) as Result;
  if (response.ok) {
    return result;
  } else {
    console.error(result.error); // Handle error
  }
}

export async function handleCreateUserFirebase(email: string) {
  const response = await fetch("/api/createUserFirebase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const result = (await response.json()) as Result;
  if (response.ok) {
    return result; // Handle success
  } else {
    console.error(result.error); // Handle error
  }
}
