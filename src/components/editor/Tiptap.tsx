"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Youtube } from "@tiptap/extension-youtube";
import Image from "@tiptap/extension-image";

interface TiptapProps {
  onChange: (newContent: string) => void;
  content: string;
  post: () => void;
}

const Tiptap = ({ onChange, content, post }: TiptapProps) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: "mx-auto",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        defaultAlignment: "left",
      }),
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "break-words px-4 py-3 justify-start border-b border-r border-l border-border text-foreground items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className="px-4">
      <Toolbar editor={editor} content={content} post={post} />
      <EditorContent
        style={{ whiteSpace: "pre-line" }}
        editor={editor}
        className="bg-white"
      />
    </div>
  );
};

export default Tiptap;
