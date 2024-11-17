"use client";
import { Trash2 } from "lucide-react";
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
} from "../ui/alert-dialog";
import { refreshPosts } from "~/lib/actions";
import { useAuth } from "~/context/authContext";

export default function DeleteComment({ postId }: { postId: number }) {
  const { user } = useAuth();
  const role = user?.role;

  const handleDelete = async (postId: number) => {
    try {
      const res = await fetch(`/api/posts/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: postId }),
      });

      if (!res.ok) {
        throw new Error("Error deleting content");
      }
      await refreshPosts();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {role === "admin" && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash2 size={18} className="cursor-pointer hover:text-gray-400" />
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
              <AlertDialogAction asChild>
                <button
                  onClick={async () => {
                    await handleDelete(postId);
                  }}
                >
                  続ける
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
