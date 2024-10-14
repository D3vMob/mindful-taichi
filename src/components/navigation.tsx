"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import avatar from "../assets/images/avatar.jpg";
import { useEffect, useState } from "react";
import { Users, type Channels } from "~/server/db/schema";
import { VideoSubMenu } from "./videoSubMenu";
import { LoginButton } from "./header/LoginButton";
import { useCurrentUserStore } from "~/store/useCurrentUsertStore";
import { auth } from "~/lib/firebase/firebase";
import { set } from "zod";

type NavigationProps = {
  channelList: Channels[];
  toggle?: () => void;
};

interface UserData {
  user: Users;
}

export default function Navigation({ toggle, channelList }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const path = pathname?.split("/").pop();
  const videoPath = pathname?.split("/")[3]?.replaceAll("%20", " ");
  const { role } = useCurrentUserStore();

  const id = auth.currentUser?.uid;
  const [access, setAccess] = useState<string[]>([]);

  useEffect(() => {
    const userSection = async () => {
      if (!id) return;
      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = (await response.json()) as UserData;
        const accesses = data.user.section ?? "";
        const accessesArray = accesses.split("/");
        setAccess(accessesArray);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    void userSection();
  }, [id]);

  const classString =
    "bg-gradient-to-r from-gray-300 to-gray-100 md:bg-gradient-to-r md:from-gray-100 md:to-gray-300";
  const handleToggleVideoMenu = () => {
    setIsOpen(!isOpen);
  };

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
        className={`select-none py-2 pl-4 hover:bg-gray-200 ${path === "" ? classString : ""}`}
        onClick={toggle}
      >
        Home
      </Link>
      <div
        className={`cursor-pointer py-2 pl-4 hover:bg-gray-200`}
        onClick={handleToggleVideoMenu}
      >
        <span className="select-none">Videos</span>
      </div>
      {isOpen ? (
        <VideoSubMenu
          channelList={channelList}
          toggle={toggle}
          path={videoPath ? videoPath : ""}
          access={access}
        />
      ) : null}
      <Link
        href={"/nav/favourites"}
        className={`select-none py-2 pl-4 hover:bg-gray-200 ${path === "favourites" ? classString : ""}`}
        onClick={toggle}
      >
        Favourites
      </Link>
      <Link
        href={"/nav/settings"}
        className={`select-none py-2 pl-4 hover:bg-gray-200 ${path === "settings" ? classString : ""}`}
        onClick={toggle}
      >
        Settings
      </Link>
      {role === "admin" && (
        <Link
          href={"/nav/admin"}
          className={`select-none py-2 pl-4 hover:bg-gray-200 ${path === "admin" ? classString : ""}`}
          onClick={toggle}
        >
          Admin
        </Link>
      )}
      <LoginButton classes="ml-4 md:hidden" />
    </div>
  );
}
