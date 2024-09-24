"use client";
import { useState } from "react";
// import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "~/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { useCurrentUserStore } from "~/store/useCurrentUsertStore";
import { type Users } from "~/server/db/schema";

interface UserData {
  user: Users;
}

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUserRole, role } = useCurrentUserStore();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (auth.currentUser?.uid) {
        const response = await fetch(`/api/users/${auth.currentUser.uid}`);
        console.log(`Response status: ${response.status}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }
        const data = (await response.json()) as UserData;
        console.log("Fetched user data:", data.user.role);
        if (data.user.role) {
          setUserRole(data.user.role);
        } else {
          console.warn("User role is undefined or null");
        }
        console.log("User role set:", role);
      }
      return router.push("/");
    } catch (e) {
      console.error(e);
    } finally {
      setEmail("");
      setPassword("");
      console.log(auth.currentUser?.uid ?? "");
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
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="w-96 rounded-lg p-10 shadow-xl">
        <h1 className="mb-5 text-2xl text-gray-600">
          {isLogin ? "Sign In" : "Reset Password"}
        </h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border-2 border-gray-300 p-3 text-gray-700 placeholder-gray-500 outline-none"
        />
        {isLogin && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded border-2 border-gray-300 p-3 text-gray-700 placeholder-gray-500 outline-none"
          />
        )}
        <button
          onClick={isLogin ? handleSignIn : handleResetPassword}
          className="w-full rounded bg-gray-600 p-3 text-white hover:bg-gray-500"
        >
          {isLogin ? "Sign In" : "Reset"}
        </button>
        <div
          onClick={() => setIsLogin(!isLogin)}
          className="w-full cursor-pointer p-3 text-center text-gray-600 hover:text-blue-500"
        >
          {isLogin ? "Reset Password" : "Sign In"}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
