"use client";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useAuth } from "~/context/authContext";

export const UpdateComment = ({ postId }: { postId: number }) => {
  const { user } = useAuth();

  return (
    <div>
      {user?.role === "admin" && (
        <Link href={`/editor/${postId}`}>
          <Pencil size={18} className="hover:text-gray-400" />
        </Link>
      )}
    </div>
  );
};
