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
  Link,
  Link2Off,
  List,
  ListOrdered,
  Quote,
  Redo,
  SquarePlay,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";
import { useCallback, useRef } from "react";
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

  const imageBaseUrl = env.NEXT_PUBLIC_AWS_S3_BUCKET;
  const MAX_FILE_SIZE = 4 * 1024 * 1024;

  const handleYouTube = () => {
    const url = prompt("Enter YouTube URL");
    if (!editor) {
      return null;
    }

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
    if (!editor) {
      return null;
    }
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      const bufferedImage = Buffer.from(await file.arrayBuffer());
      const fileImage = Buffer.from(bufferedImage);

      const uuid = await generateUUID();
      if (file && file.size <= MAX_FILE_SIZE) {
        await uploadS3(fileImage, uuid, file.type).then(() => {
          editor
            .chain()
            .focus()
            .setImage({ src: `${imageBaseUrl}${uuid}` })
            .run();
        });
      }
    } catch (e) {
      toast.error(
        `ファイルサイズが大きすぎます。ファイルサイズは以下を超えないようにしてください ${MAX_FILE_SIZE / (1024 * 1024)} MB.`,
      );
    }
  };

  const handleLinkClick = useCallback(() => {
    if (!editor) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl as string);
    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run() ??
        editor.chain().focus().unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  if (!editor) {
    return null;
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-between rounded-tl-md rounded-tr-md border border-foreground bg-primary/20 px-2 py-1">
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("left").run();
        }}
        className={
          editor.isActive({ textAlign: "left" })
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND"
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
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND"
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
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND"
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
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND"
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
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND"
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
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND"
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
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND"
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
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND"
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
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND"
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
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND"
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
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND"
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
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND"
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
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND"
        }
      >
        <Quote className="h-5 w-5" />
      </button>
      <button
        onClick={handleLinkClick}
        className={
          editor.isActive("link")
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND"
        }
      >
        <Link className="h-5 w-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
        className={
          editor.isActive("link")
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND"
        }
      >
        <Link2Off className="h-5 w-5" />
      </button>

      <button
        onClick={handlePickClick}
        className={
          editor.isActive("code")
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND"
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
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND"
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
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND p-1 hover:rounded-lg hover:bg-foreground hover:text-accent-foreground"
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
            ? "rounded-lg bg-foreground p-2 text-accent-foreground"
            : "text-primary-FOREGROUND p-1 hover:rounded-lg hover:bg-foreground hover:text-accent-foreground"
        }
      >
        <Redo className="h-5 w-5" />
      </button>
      {content && (
        <button
          type="button"
          className="rounded-md bg-foreground px-4 py-2 text-accent-foreground"
          onClick={post}
        >
          アップデート
        </button>
      )}
    </div>
  );
};

export default Toolbar;
