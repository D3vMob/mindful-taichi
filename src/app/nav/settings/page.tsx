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
import { toast } from "sonner";

export default function SettingsPage() {
  const handleDelete = async () => {
    "use server";
    const currentUser = auth.currentUser;
    if (currentUser?.uid) {
      await deleteUser(currentUser.uid)
        .then(() => deleteFirebaseUser(currentUser.uid))
        .then(() => redirect("/"));
    } else {
      toast("No user ID found");
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center gap-4 pt-16">
        <h1>Settings Page</h1>
        <PersonalImage />
        <DisplayName />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-destructive">Delete My Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <form action={handleDelete}>
                <input type="hidden" name="id" />
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction type="submit">Continue</AlertDialogAction>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ProtectedRoute>
  );
}
