"use client";
import { useState } from "react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "~/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { useCurrentUserStore } from "~/store/useCurrentUsertStore";
import { type Users } from "~/server/db/schema";
import { handleCustomClaim } from "~/lib/firebase/auth";
import { toast } from "sonner";

interface UserData {
  user: Users;
}

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
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

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setIsLogin(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex h-96 md:h-[30rem] items-center justify-center gap-4 px-4 text-center">
      <div className="md:max-w-md">
        <h1 className="pb-5 text-2xl text-foreground">
          {isLogin ? "Sign In" : "Reset Password"}
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              isLogin ? handleSignIn : handleResetPassword;
            }
          }}
          onClick={isLogin ? handleSignIn : handleResetPassword}
          className="w-full rounded bg-primary p-3 text-white hover:bg-accent"
        >
          {isLogin ? "Sign In" : "Reset"}
        </button>
        <div
          onClick={() => setIsLogin(!isLogin)}
          className="w-full cursor-pointer p-3 text-center text-foreground hover:text-blue-500"
        >
          {isLogin ? "Reset Password" : "Sign In"}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
