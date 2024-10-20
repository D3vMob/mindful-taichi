"use client";

import Image from "next/image";
import Link from "next/link";
import avatar from "../../assets/images/avatar.jpg";
import { usePathname } from "next/navigation";
import Navigation from "../navigation";
import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { type Channels } from "~/server/db/schema";
import { LoginButton } from "./LoginButton";
import { useAuth } from "~/hooks/useAuth";
import { handleCapitalizeFirstLetter } from "~/lib/utils";

export const Header = ({ channelList }: { channelList: Channels[] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isVisible]);
  const pathname = usePathname();
  const mainPath = pathname?.split("/").pop();
  const path = pathname?.split("/")[2];
  const containsUriComponent = (pathString: string) => {
    const decodedString = pathString.replaceAll("%20", " ");
    return decodedString;
  };

  const handleDisplayName = useCallback((): string => {
    return user?.displayName
      ? user?.displayName
      : (user?.email?.split("@")[0] ?? "null");
  }, [user]);
  console.log(pathname);
  return (
    <>
      <div className="flex h-16 w-full flex-row items-center justify-between bg-background shadow-md">
        <div className="flex flex-row items-center gap-2">
          <Link className="ml-2 flex flex-row items-center gap-2" href={"/"}>
            <Image src="/icon.png" alt="Main logo" width={48} height={48} />
            <span className="hidden text-xl font-bold text-foreground md:block">
              Mindful Tai Chi
            </span>
          </Link>
          <Link href={"/nav/favourites"}>
            <div className="flex flex-row items-center gap-2">
              {user ? (
                <>
                  <div className="flex flex-row items-center gap-2">
                    <span className="hidden text-2xl text-foreground md:block">
                      /
                    </span>
                  </div>
                  <div
                    className={`relative hidden h-12 flex-row items-center gap-2 rounded-md px-2 py-4 md:flex ${mainPath === "" ? "bg-gradient-to-r from-foreground/0 to-foreground/20" : "bg-gradient-to-r from-foreground/20 to-foreground/0"}`}
                  >
                    <div className="relative aspect-square h-9">
                      <Image
                        src={user?.photoURL ? `${user?.photoURL}` : avatar}
                        alt="personal image"
                        fill
                        sizes="(max-width: 36px) 100vw, 36px"
                        className="rounded-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-xl text-foreground">
                      {handleDisplayName()}
                    </span>
                  </div>
                </>
              ) : null}
              {path ? (
                <div className="flex flex-row items-center md:gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <span className="hidden text-2xl text-foreground md:block">
                      /
                    </span>
                  </div>
                  <span className="text-xl font-bold text-foreground">
                    {handleCapitalizeFirstLetter(containsUriComponent(path))}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-foreground md:hidden">
                  Home
                </span>
              )}
            </div>
          </Link>
        </div>
        <LoginButton classes="mr-4 hidden md:block" />
        <div
          className="relative text-foreground md:hidden"
          onClick={() => setIsVisible(!isVisible)}
        >
          <AnimatePresence>
            {isVisible ? (
              <motion.div
                key="x"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute right-4 top-[-16px] flex items-center justify-end"
              >
                <X size={36} color="currentColor" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute right-4 top-[-16px] flex items-center justify-end"
              >
                <Menu size={36} color="currentColor" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div
        className={`fixed right-0 top-0 z-20 mt-16 flex min-h-screen w-full max-w-xs flex-row justify-end transition-transform duration-300 ease-in-out md:hidden ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Navigation
          toggle={() => setIsVisible(!isVisible)}
          channelList={channelList}
          image={user?.photoURL ? `${user?.photoURL}` : avatar}
        />
      </div>
    </>
  );
};
