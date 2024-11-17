"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "~/context/authContext";

import { useSignout } from "~/hooks/useSignout";
export const LoginButton = ({ classes }: { classes: string }) => {
  const router = useRouter();
  const { user } = useAuth();
  const signout = useSignout();

  return (
    <div className={`cursor-pointer select-none ${classes}`}>
      {user ? (
        <span onClick={signout}>ログアウト</span>
      ) : (
        <span onClick={() => router.push("/login")}>ログイン</span>
      )}
    </div>
  );
};
