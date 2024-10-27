"use client";

import Image from "next/image";
import Link from "next/link";
import avatar from "../../assets/images/avatar.jpg";
import { usePathname } from "next/navigation";
import Navigation from "../navigation";
import { useCallback, useEffect, useState } from "react";
import { CircleChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { type Channels } from "~/server/db/schema";
import { LoginButton } from "./LoginButton";
import { useAuth } from "~/hooks/useAuth";
import { cn } from "~/lib/utils";

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

  const handleJapaneseNameSwitch = (name: string) => {
    let newName = "";
    switch (name) {
      case "/":
        newName = "ホーム";
        break;
      case "video":
        newName = "動画";
        break;
      case "favourites":
        newName = "お気に入り";
        break;
      case "settings":
        newName = "設定";
        break;
      case "admin":
        newName = "管理者";
        break;
      default:
        newName = name;
        break;
    }
    return newName;
  };
  console.log(path);
  return (
    <>
      <div className="flex h-16 w-full flex-row items-center justify-between bg-background shadow-lg">
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
                    <CircleChevronDown className={mainPath === "" ? "animate-pulse" : "-rotate-90"} />
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
                    {handleJapaneseNameSwitch(containsUriComponent(path))}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-foreground md:hidden">
                  ホーム
                </span>
              )}
            </div>
          </Link>
        </div>
        <LoginButton
          classes={cn(
            "mr-4 hidden md:block",
            pathname === "/" && user?.uid === undefined && "block",
          )}
        />
        {user?.uid !== undefined && (pathname === "/" ? (
          <div
            className="relative text-foreground md:hidden pr-4 pt-1"
            onClick={() => setIsVisible(!isVisible)}
          >
            <Link href={"/nav/favourites"}>
              <Menu size={36} color="currentColor" />
            </Link>
          </div>
        ) : (
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
        ))}
      </div>
      <div
        className={cn(
          `fixed right-0 top-0 z-20 mt-16 flex min-h-full w-full flex-row justify-end md:hidden`,
          isVisible ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={`z-20 transition-transform duration-300 ease-in-out ${
            isVisible ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Navigation
            toggle={() => setIsVisible(!isVisible)}
            channelList={channelList}
            image={user?.photoURL ? `${user?.photoURL}` : avatar}
          />
        </div>

        <div
          className={`absolute left-0 top-0 z-10 min-h-full min-w-full bg-gray-600/80 transition-opacity duration-300 ease-in-out ${
            isVisible ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setIsVisible(!isVisible)}
        ></div>
      </div>
    </>
  );
};
