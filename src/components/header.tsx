"use client";

import Image from "next/image";
import Link from "next/link";
import avatar from "../assets/images/avatar.jpg";
import { usePathname } from "next/navigation";
import Navigation from "./navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // Only modify the body class on the client side
    if (isVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup when component unmounts or visibility changes
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isVisible]);
  const pathname = usePathname();
  const path = pathname.split("/").pop();

  return (
    <>
      <div className="sticky top-0 z-10 flex h-16 w-full flex-row items-center justify-between overflow-hidden bg-gray-200">
        <div className="flex flex-row items-center gap-2">
          <Link className="ml-2 flex flex-row items-center gap-2" href={"/"}>
            <Image src="/icon.png" alt="Main logo" width={48} height={48} />
            <span className="hidden text-xl font-bold text-gray-600 md:block">
              Mindful Tai Chi
            </span>
          </Link>
          <Link href={"/nav/video"}>
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row items-center gap-2">
                <span className="hidden text-2xl font-bold text-gray-600 md:block">
                  /
                </span>
              </div>
              <div
                className={`hidden h-12 flex-row items-center gap-2 rounded-md bg-gray-400 px-2 py-4 md:flex ${path === "" ? "bg-gradient-to-r from-gray-200 to-gray-300" : "bg-gradient-to-r from-gray-300 to-gray-200"}`}
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
                <div className="flex flex-row items-center md:gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <span className="hidden text-2xl font-bold text-gray-600 md:block">
                      /
                    </span>
                  </div>
                  <span className="text-xl font-bold text-gray-600">
                    {path.charAt(0).toUpperCase() + path.slice(1)}
                  </span>
                </div>
              ) : null}
            </div>
          </Link>
        </div>
        <div className="mr-4 hidden md:block">LOGIN</div>
        <div
          className="text-gray-600 md:hidden relative"
          onClick={() => setIsVisible(!isVisible)}
        >
          <AnimatePresence>
            {isVisible ? (
              <motion.div
                key="x"
                initial={{ opacity: 0}}
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
        <Navigation toggle={() => setIsVisible(!isVisible)} />
      </div>
    </>
  );
};
