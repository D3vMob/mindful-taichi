import Link from "next/link";
import { redirect } from "next/navigation";
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
import { deleteChannel, getChannelById } from "~/server/channelsQueries";

export default async function AdminPage({
  params,
}: {
  params: { adminSlug: string };
}) {
  const channelDetails = await getChannelById(Number(params.adminSlug));

  const handleDelete = async () => {
    "use server";
    if (Number(params.adminSlug) !== 0) {
      await deleteChannel(Number(params.adminSlug)).then(() =>
        redirect("/nav/admin/"),
      );
    } else {
      console.log("No channel ID found");
    }
  };

  return (
    <div className="flex flex-col gap-2 px-2 pt-4 md:max-w-xl">
      <h1 className="text-3xl">Channel Details</h1>
      <div>
        <span className="font-semibold">Full name: </span>
        {channelDetails?.name ?? "No channel name found"}
      </div>
      <div>
        <span className="font-semibold">Short name: </span>
        {channelDetails?.shortName ?? "No short name found"}
      </div>
      <div>
        <span className="font-semibold">Description: </span>
        {channelDetails?.description ?? "No description found"}
      </div>
      <div>
        <span className="font-semibold">Status: </span>
        {channelDetails?.active ? (
          <span className="font-semibold text-green-500">Active</span>
        ) : (
          <span className="font-semibold text-red-500">Inactive</span>
        )}
      </div>
      <Link href={`/nav/admin/createChannel/${channelDetails?.id}`}>
        <Button>Update</Button>
      </Link>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Delete Channel</Button>
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
