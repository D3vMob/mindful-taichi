"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/context/authContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "firebase/auth";
import { auth } from "~/lib/firebase/firebase";

export const DeleteCurrentUser = () => {
  const router = useRouter();
  const { user } = useAuth();
  const handleDelete = async () => {
    try {
      if (!user) {
        throw new Error("User not found");
      }
      const response = await fetch(`/api/users/${user.uid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uuid: user.uid }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Sign out the user
      await signOut(auth);

      // Show success message
      toast.success("アカウントが削除されました");

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("アカウントの削除に失敗しました");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-destructive">アカウントを削除する</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>本当にそうでしょうか？</AlertDialogTitle>
          <AlertDialogDescription>
            この操作は元に戻せません。これにより、アカウントが完全に削除され、サーバーからデータが削除されます。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>続ける</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
