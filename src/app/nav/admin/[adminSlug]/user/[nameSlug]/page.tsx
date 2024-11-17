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
import { toast } from "sonner";

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
        .then(() => redirect("/nav/admin/"))
        .then(() =>
          toast("ユーザーは削除されました", {
            description: new Date().toLocaleString(),
          }),
        );
    } else {
      toast("ユーザーIDが見つかりません");
    }
  };
  return (
    <div className="flex flex-col gap-2 px-2 pt-4 md:max-w-xl">
      <h1>User Details</h1>
      <div className="space-y-2 py-4">
        <div>
          <span className="font-semibold">Full name: </span>
          {userDetails?.name ?? "名前が見つかりません"}
        </div>
        <div>
          <span className="font-semibold">Short name: </span>
          {userDetails?.surname ?? "姓が見つかりません"}
        </div>
        <div>
          <span className="font-semibold">Email: </span>
          {userDetails?.email ?? "メールが見つかりません"}
        </div>
        <div>
          <span className="font-semibold">Role: </span>
          {userDetails?.role ?? "役割が見つかりません"}
        </div>
        <div>
          <span className="font-semibold">Section: </span>
          {userDetails?.section ?? "セクションが見つかりません"}
        </div>
      </div>
      <div className="flex gap-2">
        <Link href={`/nav/admin/createUser/${userDetails?.uuid}`}>
          <Button>アップデート</Button>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-destructive">ユーザーを削除</Button>
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
