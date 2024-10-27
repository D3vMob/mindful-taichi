import { auth } from "~/lib/firebase/firebase";
import { redirect } from "next/navigation";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { DisplayName } from "~/components/settings/displayName";
import { PersonalImage } from "~/components/settings/personalImage";
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
import { deleteFirebaseUser } from "~/lib/firebase/firebaseAdmin";
import { deleteUser } from "~/server/usersQueries";

export default function SettingsPage() {
  const handleDelete = async () => {
    "use server";
    const currentUser = auth.currentUser;
    if (currentUser?.uid) {
      await deleteUser(currentUser.uid)
        .then(() => deleteFirebaseUser(currentUser.uid))
        .then(() => redirect("/"));
    } else {
      console.log("No user ID found");
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center gap-4 pt-2">
        <h1>設定ページ</h1>
        <PersonalImage />
        <DisplayName />
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
              <form action={handleDelete}>
                <input type="hidden" name="id" />
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction type="submit">続ける</AlertDialogAction>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ProtectedRoute>
  );
}
