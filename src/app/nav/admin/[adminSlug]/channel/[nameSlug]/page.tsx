import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";
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
      await deleteChannel(Number(params.adminSlug))
        .then(() => redirect("/nav/admin/"))
        .then(() =>
          toast("チャンネルは削除されました", {
            description: new Date().toLocaleString(),
          }),
        );
    } else {
      toast("チャンネルIDが見つかりません");
    }
  };

  return (
    <div className="flex flex-col gap-2 px-2 pt-4 md:max-w-xl">
      <h1>Channel Details</h1>
      <div className="space-y-2 py-4">
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
            <span className="font-semibold text-destructive">Inactive</span>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <Link href={`/nav/admin/createChannel/${channelDetails?.id}`}>
          <Button>アップデート</Button>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-destructive">チャンネルを削除</Button>
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
    </div>
  );
}
