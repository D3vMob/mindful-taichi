"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { useEffect, useState } from "react";
import { type Users, type Channels } from "~/server/db/schema";
import { VideoSubMenu } from "./videoSubMenu";
import { LoginButton } from "./header/LoginButton";
import { useCurrentUserStore } from "~/store/useCurrentUsertStore";
import { auth } from "~/lib/firebase/firebase";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";

type NavigationProps = {
  channelList: Channels[];
  toggle?: () => void;
  image?: string | StaticImport;
};

interface UserData {
  user: Users;
}

export default function Navigation({
  toggle,
  channelList,
  image,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const path = pathname?.split("/").pop();
  const videoPath = pathname?.split("/")[3]?.replaceAll("%20", " ");
  const { role } = useCurrentUserStore(); // TODO: get rid of this

  const user = auth.currentUser;
  const [access, setAccess] = useState<string[]>([]);

  useEffect(() => {
    const userSection = async () => {
      if (!user?.uid) return;
      try {
        const response = await fetch(`/api/users/${user.uid}`);
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
  }, [user?.uid]);

  const classString =
    "bg-gradient-to-r from-border/40 to-background md:bg-gradient-to-r md:from-background md:to-border/40";
  const handleToggleVideoMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative z-20 flex min-h-full w-48 flex-col gap-6 bg-background md:bg-border/20 md:pt-12">
        <div
          className={`relative flex h-12 flex-row items-center gap-2 px-2 py-4 md:hidden ${path === "" ? "bg-gradient-to-r from-background to-border" : "bg-gradient-to-r from-border to-background"}`}
        >
          <div className="relative aspect-square h-9">
            <Image
              src={image ?? ""}
              alt="personal image"
              fill
              sizes="(max-width: 36px) 100vw, 36px"
              className="rounded-full object-cover shadow-sm"
              loading="lazy"
            />
          </div>
          <span className="text-sm text-foreground">{user?.displayName}</span>
        </div>
        <Link
          href={"/"}
          className={`select-none py-2 pl-4 hover:bg-primary/20 ${path === "" ? classString : ""}`}
          onClick={toggle}
        >
          ホーム
        </Link>
        <div
          className={`cursor-pointer py-2 pl-4 hover:bg-primary/20`}
          onClick={handleToggleVideoMenu}
        >
          <span className="select-none">動画</span>
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
          className={`select-none py-2 pl-4 hover:bg-primary/20 ${path === "favourites" ? classString : ""}`}
          onClick={toggle}
        >
          お気に入り
        </Link>
        <Link
          href={"/nav/settings"}
          className={`select-none py-2 pl-4 hover:bg-primary/20 ${path === "settings" ? classString : ""}`}
          onClick={toggle}
        >
          設定
        </Link>
        {role === "admin" && (
          <Link
            href={"/nav/admin"}
            className={`select-none py-2 pl-4 hover:bg-primary/20 ${path === "admin" ? classString : ""}`}
            onClick={toggle}
          >
            管理者
          </Link>
        )}
        <LoginButton classes="ml-4 md:hidden" />
      </div>
    </>
  );
}
