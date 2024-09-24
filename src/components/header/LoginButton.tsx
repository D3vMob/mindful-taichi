'use client';
import { useRouter } from "next/navigation";
import { signout } from "~/lib/firebase/auth";
import { useAuth } from "~/hooks/useAuth";
export const LoginButton = ({classes}: { classes: string }) => {
    const router = useRouter();
    const { user } = useAuth();

  return (
    <div className={`cursor-pointer select-none ${classes}`}>
      {user ? <span onClick={signout}>LOGOUT</span> : <span onClick={() => router.push('/login')}>LOGIN</span>}
    </div>
  );
};
