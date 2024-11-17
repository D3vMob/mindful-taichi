import { useRouter } from "next/navigation";
import { auth } from "~/lib/firebase/firebase";

export const useSignout = () => {
  const router = useRouter();

  const signout = async () => {
    try {
      await auth.signOut();
      if (!auth.currentUser) {
        router.push("/");
      }
    } catch (error) {
      console.error(
        "Error signing out:",
        error instanceof Error ? error.message : String(error),
      );
    }
  };

  return signout;
};
