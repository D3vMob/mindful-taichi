import "server-only";

import admin from "firebase-admin";
import { type ServiceAccount } from "firebase-admin";
import { env } from "~/env";

const serviceAccount: ServiceAccount = {
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  privateKey: env.FIREBASE_ADMIN_SDK_PRIVATE_KEY.replace(/\\n/g, "\n").replace(
    /"/g,
    "",
  ),
  clientEmail: env.FIREBASE_ADMIN_SDK_CLIENT_EMAIL,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Set custom user claims
export async function setCustomUserClaims(
  uid: string,
  claims: { role: string },
) {
  const adminApp = admin.app();
  try {
    await adminApp.auth().setCustomUserClaims(uid, claims);
  } catch (error) {
    console.error("Error setting custom claims:", error);
  }
}

export async function revokeRefreshTokens(uid: string) {
  const adminApp = admin.app();
  try {
    await adminApp.auth().revokeRefreshTokens(uid);
  } catch (error) {
    console.error(`Error refreshing token:`, error);
  }
}

const randomPassword = Math.random().toString(36).slice(-8);

export async function createUserFirebase(email: string) {
  const adminApp = admin.app();
  try {
    const user = await adminApp.auth().createUser({
      email,
      password: randomPassword,
      disabled: false,
      emailVerified: false,
    });
    const resetPasswordLink = await adminApp
      .auth()
      .generatePasswordResetLink(email);
    const verifyEmailLink = await adminApp
      .auth()
      .generateEmailVerificationLink(email);

    return { reset: resetPasswordLink, verify: verifyEmailLink, user: user };
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

export async function deleteFirebaseUser(uid: string) {
  const adminApp = admin.app();
  try {
    await adminApp.auth().deleteUser(uid);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

export async function getFirebaseUserPhoto(uid: string) {
  const adminApp = admin.app();
  try {
    const user = await adminApp.auth().getUser(uid);
    return user.photoURL;
  } catch (error) {
    console.error("Error getting user photo:", error);
    return null;
  }
}
