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
import { useCurrentUserStore } from "~/store/useCurrentUsertStore";

export default function DeleteComment({ postId }: { postId: number }) {
  const { role } = useCurrentUserStore();

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
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <button
                  onClick={async () => {
                    await handleDelete(postId);
                  }}
                >
                  Continue
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
