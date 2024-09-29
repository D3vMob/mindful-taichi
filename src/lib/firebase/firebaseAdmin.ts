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
export async function setCustomUserClaims(uid: string, claims: {role: string}) {
    const adminApp = admin.app();
    try {
      await adminApp.auth().setCustomUserClaims(uid, claims);
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
