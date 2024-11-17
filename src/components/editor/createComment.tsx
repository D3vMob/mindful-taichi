"use client";
import Link from "next/link";
import { useAuth } from "~/context/authContext";

export const CreateComment = () => {
  const { user } = useAuth();
  const role = user?.role;
  return (
    <div>
      {role === "admin" && (
        <Link href={"/editor"}>
          <div className="fixed bottom-4 right-4 z-50 cursor-pointer select-none rounded-full border border-gray-300 bg-white px-6 py-4 text-lg font-bold opacity-75 shadow-md md:hover:bg-gray-100 md:hover:text-gray-900">
            +
          </div>
        </Link>
      )}
    </div>
  );
};
