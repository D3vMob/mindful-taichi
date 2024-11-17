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
  try {
    const response = await fetch("/api/setCustomClaims", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, claims }),
    });

    // Log the response status and status text for debugging
    // console.log('Custom Claims Response:', {
    //   status: response.status,
    //   statusText: response.statusText
    // });

    // Try to parse the response as JSON, but handle cases where it might not be JSON
    let result: Result;
    try {
      result = (await response.json()) as Result;
    } catch (parseError) {
      console.error("Failed to parse response:", parseError);
      throw new Error("Invalid response format from server");
    }

    if (!response.ok) {
      // Log the full error details
      console.error("Custom Claims Error:", {
        status: response.status,
        error: result.error,
        message: result.message,
      });
      throw new Error(result.error || "Failed to set custom claims");
    }

    return result;
  } catch (error) {
    console.error("handleCustomClaim failed:", error);
    throw error; // Re-throw the error to be handled by the calling function
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
