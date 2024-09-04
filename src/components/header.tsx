"use client";

import Image from "next/image";
import Link from "next/link";
import avatar from "../assets/images/avatar.jpg";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const path = pathname.split("/").pop();

  return (
    <div className="flex h-16 w-full flex-row items-center justify-between bg-gray-200">
      <div className="flex flex-row items-center gap-2">
        <Link className="ml-2 flex flex-row items-center gap-2" href={"/"}>
          <Image src="/icon.png" alt="Main logo" width={48} height={48} />
          <span className="text-xl font-bold text-gray-600">
            Mindful Tai Chi
          </span>
        </Link>
        <Link href={"/nav/video"}>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center gap-2">
              <span className="text-2xl font-bold text-gray-600">/</span>
            </div>
            <div
              className={`flex h-12 flex-row items-center gap-2 rounded-md bg-gray-400 px-2 py-4 ${path === "" ? "bg-gradient-to-r from-gray-200 to-gray-300" : "bg-gradient-to-r from-gray-300 to-gray-200"}`}
            >
              <Image
                className="rounded-full shadow-sm"
                src={avatar}
                alt="avatar"
                width={36}
                height={36}
              />
              <span className="text-xl text-gray-600">Andre Desbiens</span>
            </div>
            {path ? (
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center gap-2">
                  <span className="text-2xl font-bold text-gray-600">/</span>
                </div>
                <span className="text-xl font-bold text-gray-600">{path}</span>
              </div>
            ) : null}
          </div>
        </Link>
      </div>
      <div className="mr-4">LOGIN</div>
    </div>
  );
};
