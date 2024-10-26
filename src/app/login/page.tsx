"use client";
import { useState } from "react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "~/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { useCurrentUserStore } from "~/store/useCurrentUsertStore";
import { type InsertUser, type Users } from "~/server/db/schema";
import { handleCustomClaim } from "~/lib/firebase/auth";
import { toast } from "sonner";

interface UserData {
  user: Users;
}

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUserRole, setFav } = useCurrentUserStore();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (auth.currentUser?.uid) {
        let tokenResult = await auth.currentUser.getIdTokenResult();
        let role = tokenResult.claims.role;

        if (!role) {
          await handleCustomClaim(auth.currentUser.uid, { role: "user" });

          await auth.currentUser.getIdToken(true);
          tokenResult = await auth.currentUser.getIdTokenResult();
          role = tokenResult.claims.role;
        }

        setUserRole(role as string);

        const response = await fetch(`/api/users/${auth.currentUser.uid}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }
        const data = (await response.json()) as UserData;
        setFav(data.user?.fav ?? []);
      }
      return router.push("/");
    } catch (e) {
      toast("Error during sign-in");
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          if (!res.user) return;
          console.log("create DRIZZLE user", res.user);
          const newData = {
            name: res.user.displayName ?? "",
            surname: "",
            email: res.user.email ?? "",
            section: "",
            uuid: res.user.uid ?? "",
            role: "user",
          } as InsertUser;

          console.log("create DRIZZLE user", newData);
          const result = await fetch(`/api/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          });
          if (!result.ok) {
            throw new Error("Failed to create user");
          }

          toast("Successfully created user");
        })
        .then(async () => {
          if (auth.currentUser?.uid) {
            await handleCustomClaim(auth.currentUser.uid, { role: "user" });

            const response = await fetch(`/api/users/${auth.currentUser.uid}`);
            if (!response.ok) {
              throw new Error(
                `Failed to fetch user data: ${response.statusText}`,
              );
            }
            const data = (await response.json()) as UserData;
            setFav(data.user?.fav ?? []);
          }
          return router.push("/");
        });
    } catch (e) {
      toast("Error during sign-un");
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setIsLogin(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex h-96 w-full items-center justify-center gap-4 px-4 text-center md:h-[30rem]">
      <div className="md:max-w-md">
        <h1 className="pb-5 text-2xl text-foreground">
          {isLogin
            ? !isSignUp
              ? "サインアップ"
              : "ログイン"
            : "パスワードをリセット"}
        </h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border-2 border-border/50 p-3 text-foreground placeholder-border/30 outline-none"
        />
        {isLogin && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded border-2 border-border/50 p-3 text-foreground placeholder-border/30 outline-none"
          />
        )}
        <button
          onClick={
            isLogin
              ? !isSignUp
                ? handleSignUp
                : handleSignIn
              : handleResetPassword
          }
          className="w-full rounded bg-primary p-3 text-white hover:bg-accent"
        >
          {isLogin ? (!isSignUp ? "サインアップ" : "ログイン") : "リセット"}
        </button>
        <div className="flex">
          <div
            onClick={() => setIsLogin(!isLogin)}
            className="w-full cursor-pointer p-3 text-center text-foreground hover:text-blue-500"
          >
            {isLogin ? "パスワードをリセット" : "ログイン"}
          </div>
          {isLogin && (
            <div
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full cursor-pointer p-3 text-center text-foreground hover:text-blue-500"
            >
              {isSignUp ? "サインアップ" : "ログイン"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
