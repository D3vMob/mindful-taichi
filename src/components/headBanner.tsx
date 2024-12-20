"use client";

import Image from "next/image";
import HeadImage from "../assets/images/head_image.jpg";
import { Yuji_Boku } from "next/font/google";
import { quotes } from "~/lib/quotes";

const yujiBoku = Yuji_Boku({ subsets: ["latin"], weight: "400" });

export const HeadBanner = () => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <>
      <div className="relative flex justify-center bg-black">
        <div
          className={`${yujiBoku.className} absolute left-8 top-8 z-10 max-h-36 text-pretty break-words text-end text-white md:left-72 md:max-h-[23rem] md:text-5xl`}
        >
          <p
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
              direction: "rtl",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
            }}
          >
            {quote?.quote}
          </p>
        </div>
        <div
          className={`${yujiBoku.className} absolute bottom-8 right-48 z-50 max-h-96 text-pretty text-end text-xl text-white`}
        >
          {quote?.author !== "Japanese proverb" && <p>~ {quote?.author}</p>}
        </div>
        <Image
          src={HeadImage}
          alt="Main logo"
          className=""
          style={{
            maskImage:
              "linear-gradient(to right, transparent 10%, black 40%, black 60%, transparent 90%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 10%, black 40%, black 60%, transparent 90%)",
          }}
        />
      </div>
    </>
  );
};
