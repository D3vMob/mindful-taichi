import { useRouter } from "next/navigation";
import { useCurrentUserStore } from "~/store/useCurrentUsertStore";
import { auth } from "~/lib/firebase/firebase";

export const useSignout = () => {
  const { setUserRole, setFav } = useCurrentUserStore();
  const router = useRouter();

  const signout = async () => {
    try {
      await auth.signOut();
      if (!auth.currentUser) {
        setUserRole(null);
        setFav(null);
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
