"use client";
import { updateUserPhoto } from "~/lib/firebase/auth";

import Image from "next/image";

import { useRef } from "react";
import { env } from "~/env";
import avatar from "../../assets/images/avatar.jpg";
import { generateUUID, uploadS3 } from "~/lib/uploadS3";
import { useAuth } from "~/hooks/useAuth";
import { refreshSettings } from "~/lib/actions";
import { toast } from "sonner";

const imageBaseUrl = env.NEXT_PUBLIC_AWS_S3_BUCKET;
const MAX_FILE_SIZE = 4 * 1024 * 1024;

export const PersonalImage = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  function handlePickClick() {
    imageInputRef?.current?.click();
  }
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // setIsUpdating(true);
    const file = event.target.files?.[0];
    if (!file) return;

    const bufferedImage = Buffer.from(await file.arrayBuffer());
    const fileImage = Buffer.from(bufferedImage);
    const uuid = await generateUUID();
    if (file && file.size <= MAX_FILE_SIZE) {
      await uploadS3(fileImage, uuid, file.type)
        .then(() => {
          try {
            if (user) {
              void updateUserPhoto(user, `${imageBaseUrl}${uuid}`);
            }
          } catch (error) {
            console.error(error);
          }
        })
        .then(async () => {
          if (!user) return;
          await user.reload();
        })
        .then(async () => {
          await refreshSettings();
        });
    } else {
      toast(
        `File size is too large, File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)} MB.`,
      );
    }
  };

  return (
    <div className="flex max-w-48 flex-col">
      <div className="relative rounded-full border border-gray-700 md:w-48">
        <input
          type="file"
          ref={imageInputRef}
          onChange={handleImageChange}
          hidden
        />
        <div
          className="absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none text-center opacity-0 transition-opacity hover:bg-gray-700/50 hover:text-white hover:opacity-100"
          onClick={() => {
            handlePickClick();
          }}
        >
          CLICK TO UPLOAD
        </div>
        <div className="aspect-square h-48"></div>
        <Image
          src={user?.photoURL ?? avatar}
          alt="personal image"
          fill
          sizes="(max-width: 480px) 100vw, 480px"
          className="rounded-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};
