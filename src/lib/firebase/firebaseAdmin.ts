"use server";

import admin from "firebase-admin";
import { type ServiceAccount } from "firebase-admin";
import { env } from "~/env";

const serviceAccount: ServiceAccount = {
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  privateKey: env.FIREBASE_ADMIN_SDK_PRIVATE_KEY.replace(/\\n/g, "\n").replace(/"/g, ""),
  clientEmail: env.FIREBASE_ADMIN_SDK_CLIENT_EMAIL,
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Set custom user claims
export async function setCustomUserClaims(uid: string, customUserClaims: {role: string}) {
    const adminApp = admin.app();
    try {
      await adminApp.auth().setCustomUserClaims(uid, customUserClaims);
      console.log(`Custom claims set for user ${uid}`);
    } catch (error) {
      console.error('Error setting custom claims:', error);
    }
  }

  export async function revokeRefreshTokens(uid:string) {
    const adminApp = admin.app();
    try {
        await adminApp.auth().revokeRefreshTokens(uid);
        console.log(`Refreshed token for ${uid}`)
    } catch(error) {
        console.log(`Error refreshing token:`, error)
    }
  }

// Retrieve user claims
export async function getUserClaims(uid: string) {
  const adminApp = admin.app();
  try {
    const userRecord = await adminApp.auth().getUser(uid);
    return userRecord.customClaims;
  } catch (error) {
    console.error("Error retrieving user claims:", error);
    return null;
  }
}
