import Link from "next/link";
import { Button } from "~/components/ui/button";
import { deleteUser, getUserById } from "~/server/usersQueries";
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
import { redirect } from "next/navigation";
import { deleteFirebaseUser } from "~/lib/firebase/firebaseAdmin";

export default async function AdminPage({
  params,
}: {
  params: { adminSlug: string };
}) {
  const userDetails = await getUserById(params.adminSlug);
  const handleDelete = async () => {
    "use server";
    if (Number(params.adminSlug) !== 0) {
      await deleteUser(params.adminSlug)
        .then(() => deleteFirebaseUser(params.adminSlug))
        .then(() => redirect("/nav/admin/"));
    } else {
      console.log("No user ID found");
    }
  };
  return (
    <div>
      <h1>User Details</h1>
      <div>
        <span className="font-semibold">Full name: </span>
        {userDetails?.name ?? "No name found"}
      </div>
      <div>
        <span className="font-semibold">Short name: </span>
        {userDetails?.surname ?? "No surname found"}
      </div>
      <div>
        <span className="font-semibold">Email: </span>
        {userDetails?.email ?? "No email found"}
      </div>
      <div>
        <span className="font-semibold">Role: </span>
        {userDetails?.role ?? "No role found"}
      </div>
      <div>
        <span className="font-semibold">Section: </span>
        {userDetails?.section ?? "No section found"}
      </div>
      <Link href={`/nav/admin/createUser/${userDetails?.uuid}`}>
        <Button>Update</Button>
      </Link>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Delete User</Button>
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
  );
}
