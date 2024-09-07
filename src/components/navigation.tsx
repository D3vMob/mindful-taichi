"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import avatar from "../assets/images/avatar.jpg";

type NavigationProps = {
  toggle?: () => void;
};

export default function Navigation({ toggle }: NavigationProps) {
  const pathname = usePathname();
  const path = pathname.split("/").pop();

  const classString = "bg-gradient-to-r from-gray-300 to-gray-100 md:bg-gradient-to-r md:from-gray-100 md:to-gray-300"


  return (
    <div className="flex w-48 flex-col gap-6 bg-gray-100 md:pt-12">
      <div
        className={`flex h-12 flex-row items-center gap-2 bg-gray-400 px-2 py-4 md:hidden ${path === "" ? "bg-gradient-to-r from-gray-200 to-gray-300" : "bg-gradient-to-r from-gray-300 to-gray-200"}`}
      >
        <Image
          className="rounded-full shadow-sm"
          src={avatar}
          alt="avatar"
          width={36}
          height={36}
        />
        <span className="text-sm text-gray-600">Andre Desbiens</span>
      </div>
      <Link
        href={"/"}
        className={`py-2 pl-4 hover:bg-gray-200 md:hidden ${path === "" ? classString : ""}`}
        onClick={toggle}
      >
        Home
      </Link>
      <Link
        href={"/nav/video"}
        className={`py-2 pl-4 hover:bg-gray-200 ${path === "video" ? classString : ""}`}
        onClick={toggle}
      >
        Video
      </Link>
      <Link
        href={"/nav/favourites"}
        className={`py-2 pl-4 hover:bg-gray-200 ${path === "favourites" ? classString : ""}`}
        onClick={toggle}
      >
        Favourites
      </Link>
      <Link
        href={"/nav/settings"}
        className={`py-2 pl-4 hover:bg-gray-200 ${path === "settings" ? classString : ""}`}
        onClick={toggle}
      >
        Settings
      </Link>
      <Link
        href={"/nav/admin"}
        className={`py-2 pl-4 hover:bg-gray-200 ${path === "admin" ? classString : ""}`}
        onClick={toggle}
      >
        Admin
      </Link>
      <div className="ml-4 md:hidden">LOGIN</div>
    </div>
  );
}