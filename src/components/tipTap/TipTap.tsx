"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import BulletList from "@tiptap/extension-bullet-list";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Blockquote from "@tiptap/extension-blockquote";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./menu/MenuBar";
import "./TipTap.css";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { Description } from "@radix-ui/react-dialog";

const Tiptap = ({
  postId,
  toCreate,
  refreshPosts,
}: {
  postId?: number;
  toCreate: boolean;
  refreshPosts: () => void;
}) => {
  const [content, setContent] = useState("");
  const editor = useEditor({
    extensions: [
      Document,
      Blockquote,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-style-type: circle",
        },
      }),
      Text,
      Paragraph,
      Heading,
      HorizontalRule,
      Image,
      ListItem,
      TextAlign,
      Youtube,
    ],
    content: "<p>Hello, World!</p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg [&_h4]:text-base [&_h5]:text-sm [&_h6]:text-xs",
      },
    },
    // Add this line to resolve the SSR issue
    immediatelyRender: false,
  });

  useEffect(() => {
    if (postId) {
      // Fetch existing content by postId
      // const fetchContent = async () => {
      //   try {
      //     const res = await fetch(`/api/posts/${postId}`);
      //     const data = await res.json();
      //     if (data?.content) {
      //       editor?.commands.setContent(data.content);  // Set the content in the editor
      //     }
      //   } catch (error) {
      //     console.error('Failed to load content', error);
      //   }
      // };
      // fetchContent();
    }
  }, [postId, editor]);

  const updateContent = async () => {
    console.log(content);
    try {
      const res = await fetch(`/api/posts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        throw new Error("Error updating content");
      }
      refreshPosts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {toCreate ? (
          <div className="fixed right-4 top-20 cursor-pointer select-none rounded-full border border-gray-300 bg-white px-4 py-2 text-lg font-bold shadow-md hover:bg-gray-100 hover:text-gray-900">
            +
          </div>
        ) : (
          <div className="">
            <Pencil size={18} className="hover:text-gray-400" />
          </div>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>CREATE YOUR OWN CONTENT!</DialogTitle>
          <div className="editor">
            {editor && <MenuBar editor={editor} />}
            <EditorContent className="editor__content" editor={editor} />
          </div>
        </DialogHeader>
        <Description></Description>
        <DialogClose asChild>
          <Button onClick={updateContent}>Submit</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default Tiptap;
