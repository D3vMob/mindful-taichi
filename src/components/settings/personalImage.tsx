"use client";
import { updateUserPhoto } from "~/lib/firebase/auth";
import { auth } from "~/lib/firebase/firebase";

import Image from "next/image";

import { useState, useRef, useEffect } from "react";
import { env } from "~/env";
import avatar from "../../assets/images/avatar.jpg";
import { generateUUID, uploadS3 } from "~/lib/uploadS3";

const imageBaseUrl = env.NEXT_PUBLIC_AWS_S3_BUCKET;

export const PersonalImage = () => {
  const [pickedImage, setPickedImage] = useState<File | null>(null);
  const [imageKey, setImageKey] = useState(Date.now());
  const imageInputRef = useRef<HTMLInputElement>(null);
  const user = auth.currentUser;

  function handlePickClick() {
    imageInputRef?.current?.click();
  }
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const bufferedImage = Buffer.from(await file.arrayBuffer());
    const fileImage = Buffer.from(bufferedImage);

    const uuid = await generateUUID();
    if (file) {
      await uploadS3(fileImage, uuid, file.type).then(() => {
        try {
          if (user) {
            void updateUserPhoto(user, `${imageBaseUrl}${uuid}`).then(() => {
              setImageKey(Date.now()); // Trigger re-render after update
            });;
          }
        } catch (error) {
          console.error(error);
        }
      });
    }
  };

  useEffect(() => {
    // Force re-render when user changes
    setImageKey(Date.now());
  }, [user]);
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
          className="absolute left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none text-center opacity-0 transition-opacity hover:bg-gray-700/50 hover:text-white hover:opacity-100"
          onClick={() => {
            handlePickClick();
            console.log("click");
          }}
        >
          CLICK TO UPLOAD
        </div>
        <Image
          src={user?.photoURL ? `${user?.photoURL}` : avatar}
          alt="personal image"
          width={192}
          height={192}
          className="rounded-full"
        />
      </div>
    </div>
  );
};
