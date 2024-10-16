"use client";

import { type Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  FileImage,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  SquarePlay,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { env } from "~/env";
import { generateUUID, uploadS3 } from "~/lib/uploadS3";

type Props = {
  editor: Editor | null;
  content: string;
  post: () => void;
};

const Toolbar = ({ editor, content, post }: Props) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  if (!editor) {
    return null;
  }

  const imageBaseUrl = env.NEXT_PUBLIC_AWS_S3_BUCKET;

  const handleYouTube = () => {
    const url = prompt("Enter YouTube URL");

    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:\S+)?/;
    if (url !== null) {
      const match = url.match(youtubeRegex);
      if (match?.[1]) {
        editor.commands.setYoutubeVideo({ src: url, width: 352, height: 198 });
      }
    }
  };

  function handlePickClick() {
    imageInputRef?.current?.click();
  }

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      const bufferedImage = Buffer.from(await file.arrayBuffer());
      const fileImage = Buffer.from(bufferedImage);

      const uuid = await generateUUID();
      if (file) {
        await uploadS3(fileImage, uuid, file.type).then(() => {
          editor
            .chain()
            .focus()
            .setImage({ src: `${imageBaseUrl}${uuid}` })
            .run();
        });
      }
    } catch (e) {
      toast("An error has happened while attempting to load an image.");
    }
  };

  return (
    <div className="flex w-full flex-wrap items-center justify-between rounded-tl-md rounded-tr-md border border-gray-700 px-2 py-1">
      
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign("left").run();
          }}
          className={
            editor.isActive({ textAlign: "left" })
              ? "rounded-lg bg-gray-700 p-2 text-white"
              : "text-gray-400"
          }
        >
          <AlignLeft className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign("center").run();
          }}
          className={
            editor.isActive({ textAlign: "center" })
              ? "rounded-lg bg-gray-700 p-2 text-white"
              : "text-gray-400"
          }
        >
          <AlignCenter className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign("right").run();
          }}
          className={
            editor.isActive({ textAlign: "right" })
              ? "rounded-lg bg-gray-700 p-2 text-white"
              : "text-gray-400"
          }
        >
          <AlignRight className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign("justify").run();
          }}
          className={
            editor.isActive({ textAlign: "justify" })
              ? "rounded-lg bg-gray-700 p-2 text-white"
              : "text-gray-400"
          }
        >
          <AlignJustify className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "rounded-lg bg-gray-700 p-2 text-white"
              : "text-gray-400"
          }
        >
          <Bold className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "rounded-lg bg-gray-700 p-2 text-white"
              : "text-gray-400"
          }
        >
          <Italic className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "rounded-lg bg-gray-700 p-2 text-white"
              : "text-gray-400"
          }
        >
          <Underline className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "rounded-lg bg-gray-700 p-2 text-white"
              : "text-gray-400"
          }
        >
          <Strikethrough className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={
            editor.isActive("heading", { level: 1 })
              ? "rounded-lg bg-gray-700 p-2 text-white"
              : "text-gray-400"
          }
        >
          <Heading1 className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={
            editor.isActive("heading", { level: 3 })
              ? "rounded-lg bg-gray-700 p-2 text-white"
              : "text-gray-400"
          }
        >
          <Heading3 className="h-5 w-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "rounded-lg bg-gray-700 p-2 text-white"
              : "text-gray-400"
          }
        >
          <List className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "rounded-lg bg-gray-700 p-2 text-white"
              : "text-gray-400"
          }
        >
          <ListOrdered className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "rounded-lg bg-gray-700 p-2 text-white"
              : "text-gray-400"
          }
        >
          <Quote className="h-5 w-5" />
        </button>
        
        <button
          onClick={handlePickClick}
          className={
            editor.isActive("code")
              ? "rounded-lg bg-gray-700 p-2 text-white"
              : "text-gray-400"
          }
        >
          <FileImage className="h-5 w-5" />
        </button>
        <input
          type="file"
          ref={imageInputRef}
          onChange={handleImageChange}
          hidden
        />
        <button
          onClick={handleYouTube}
          className={
            editor.isActive("code")
              ? "rounded-lg bg-gray-700 p-2 text-white"
              : "text-gray-400"
          }
        >
          <SquarePlay className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "rounded-lg bg-gray-700 p-2 text-white"
              : "p-1 text-gray-400 hover:rounded-lg hover:bg-gray-700 hover:text-white"
          }
        >
          <Undo className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "rounded-lg bg-gray-700 p-2 text-white"
              : "p-1 text-gray-400 hover:rounded-lg hover:bg-gray-700 hover:text-white"
          }
        >
          <Redo className="h-5 w-5" />
        </button>
      {content && (
        <button
          type="button"
          className="rounded-md bg-gray-700 px-4 py-2 text-white"
          onClick={post}
        >
          Update
        </button>
      )}
    </div>
  );
};

export default Toolbar;
