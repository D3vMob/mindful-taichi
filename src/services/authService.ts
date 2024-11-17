import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  type UserCredential,
} from "firebase/auth";
import { auth } from "~/lib/firebase/firebase";
import { roleService } from "./roleService";
import { type UserRole } from "~/types/auth";
import { SignInInput, signInSchema } from "~/lib/firebase/authValidations";
import { z } from "zod";
import { InsertUser, Users } from "~/server/db/schema";
import { handleCustomClaim } from "~/lib/firebase/auth";

interface UserData {
  user: Users;
}

export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async signIn(input: SignInInput): Promise<UserCredential> {
    try {
      // Validate input
      const validated = signInSchema.parse(input);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        validated.email,
        validated.password,
      );

      // Check and set default role if needed
      const claims = await roleService.getUserClaims();
      if (!claims?.role) {
        await roleService.setUserRole(userCredential.user.uid, "user");
      }

      return userCredential;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(error.errors[0]?.message ?? "Validation failed");
      }
      throw this.handleAuthError(error);
    }
  }

  async signUp(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (result) => {
          if (!result.user) result;
          const newData = {
            name: result.user.displayName ?? "",
            surname: "",
            email: result.user.email ?? "",
            section: "",
            uuid: result.user.uid,
            role: "user",
          } as InsertUser;

          const response = await fetch(`/api/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          });

          if (!response.ok) {
            console.error(`Failed to create user: ${response.statusText}`);
            throw new Error(`Failed to create user: ${response.statusText}`);
          }
        })
        .then(async () => {
          if (auth.currentUser?.uid) {
            await handleCustomClaim(auth.currentUser.uid, { role: "user" });
          }
        });
    } catch (claimError) {
      console.error("Failed to set custom claims:", claimError);
      // Continue execution even if claims fail
    } finally {
      await signOut(auth);
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  private handleAuthError(error: unknown): Error {
    if ((error as { code?: string }).code) {
      const errorCode = (error as { code: string }).code;
      switch (errorCode) {
        case "auth/user-not-found":
          return new Error("このメールアドレスを持つユーザーは見つかりません");
        case "auth/wrong-password":
          return new Error("パスワードが無効です");
        case "auth/email-already-in-use":
          return new Error("メールアドレスはすでに登録されています");
        case "auth/weak-password":
          return new Error("パスワードが弱すぎます");
        case "auth/invalid-email":
          return new Error("無効なメール形式");
        default:
          return new Error(`認証エラー: ${errorCode}`);
      }
    }
    return error as Error;
  }
}

export const authService = AuthService.getInstance();
