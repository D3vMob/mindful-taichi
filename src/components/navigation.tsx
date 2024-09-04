"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const path = pathname.split("/").pop();
  return (
    <div className="flex min-h-screen w-48 flex-col gap-6 bg-gray-100 pt-12">
      <Link
        href={"/nav/video"}
        className={`py-2 pl-4 hover:bg-gray-200 ${path === "video" ? "bg-gradient-to-r from-gray-100 to-gray-300" : ""}`}
      >
        Video
      </Link>
      <Link
        href={"/nav/favourites"}
        className={`py-2 pl-4 hover:bg-gray-200 ${path === "favourites" ? "bg-gradient-to-r from-gray-100 to-gray-300" : ""}`}
      >
        Favourites
      </Link>
      <Link
        href={"/nav/settings"}
        className={`py-2 pl-4 hover:bg-gray-200 ${path === "settings" ? "bg-gradient-to-r from-gray-100 to-gray-300" : ""}`}
      >
        Settings
      </Link>
      <Link
        href={"/nav/admin"}
        className={`py-2 pl-4 hover:bg-gray-200 ${path === "admin" ? "bg-gradient-to-r from-gray-100 to-gray-300" : ""}`}
      >
        Admin
      </Link>
    </div>
  );
}
