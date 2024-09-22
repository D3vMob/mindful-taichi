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
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph", "left", "center", "right", "justify"],
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
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor} content={content} post={post} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default Tiptap;

// "use client";

// import { useEditor, EditorContent, Editor } from "@tiptap/react";
// import BulletList from "@tiptap/extension-bullet-list";
// import HorizontalRule from "@tiptap/extension-horizontal-rule";
// import Image from "@tiptap/extension-image";
// import Blockquote from "@tiptap/extension-blockquote";
// import Document from "@tiptap/extension-document";
// import Heading from "@tiptap/extension-heading";
// import ListItem from "@tiptap/extension-list-item";
// import Text from "@tiptap/extension-text";
// import Paragraph from "@tiptap/extension-paragraph";
// import Youtube from "@tiptap/extension-youtube";
// import TextAlign from "@tiptap/extension-text-align";
// import MenuBar from "./menu/MenuBar";
// import "./TipTap.css";
// import { useCallback, useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "~/components/ui/dialog";
// import { Button } from "../ui/button";
// import { Pencil } from "lucide-react";
// import { Description } from "@radix-ui/react-dialog";
// import { type Posts } from "~/server/db/schema";

// type PostResponse = {
//   message: string;
//   result: Posts;
// };

// const Tiptap = ({
//   postId,
//   toCreate,
//   refreshPosts,
// }: {
//   postId?: number;
//   toCreate: boolean;
//   refreshPosts: () => void;
// }) => {
//   const [content, setContent] = useState("");
//   const [currentPostId, setCurrentPostId] = useState<number | undefined>(
//     undefined,
//   );
//   const [isLoading, setIsLoading] = useState(false);

//   const editor = useEditor({
//     extensions: [
//       Document,
//       Blockquote,
//       BulletList.configure({
//         HTMLAttributes: {
//           class: "list-style-type: circle",
//         },
//       }),
//       Text,
//       Paragraph,
//       Heading,
//       HorizontalRule,
//       Image,
//       ListItem,
//       TextAlign,
//       Youtube,
//     ],
//     content: "<p>Hello, World!</p>",
//     editorProps: {
//       attributes: {
//         class:
//         "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
//       },
//     },
//     onUpdate: ({ editor }: { editor: Editor }) => {
//       setContent(editor.getHTML());
//     },
//     immediatelyRender: false,
//   }, []);

//   const fetchContent = useCallback(async () => {
//     console.log(currentPostId);
//     if (!currentPostId || !isLoading) return;
//     console.log("fetching content");
//     try {
//       const res = await fetch(`/api/posts/${currentPostId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (!res.ok) {
//         throw new Error("Error fetching content");
//       }
//       const data = (await res.json()) as PostResponse;
//       console.log(data.result.content);
//       setContent(data.result.content); // Update the content state
//       editor?.commands.setContent(data.result.content);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [currentPostId, isLoading, editor?.commands]);

//   useEffect(() => {
//     if (postId && !toCreate) {
//       setIsLoading(true);
//     }
//   }, [postId, toCreate]);

//   useEffect(() => {
//     if (currentPostId && !toCreate && isLoading) {
//       void fetchContent();
//     }
//   }, [currentPostId, toCreate, fetchContent, isLoading]);

//   const createContent = async () => {
//     console.log(content);
//     try {
//       const res = await fetch(`/api/posts/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ content }),
//       });

//       if (!res.ok) {
//         throw new Error("Error creating content");
//       }
//       setContent("");
//       refreshPosts();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const updateContent = async () => {
//     console.log(currentPostId);
//     try {
//       const res = await fetch(`/api/posts/`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           content: content,
//           id: currentPostId,
//         }),
//       });
//       if (!res.ok) {
//         throw new Error("Error updating content");
//       }
//       refreshPosts();
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   // console.log(postId)
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         {toCreate ? (
//           <div className="fixed right-4 top-20 cursor-pointer select-none rounded-full border border-gray-300 bg-white px-4 py-2 text-lg font-bold shadow-md hover:bg-gray-100 hover:text-gray-900">
//             +
//           </div>
//         ) : (
//           <div
//             className=""
//             onClick={() => {
//               setCurrentPostId(postId);
//               setIsLoading(true);
//             }}
//           >
//             <Pencil size={18} className="hover:text-gray-400" />
//           </div>
//         )}
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>CREATE YOUR OWN CONTENT!</DialogTitle>
//           <div className="editor">
//             {editor && <MenuBar editor={editor} />}
//             <EditorContent className="editor__content" editor={editor} />
//           </div>
//         </DialogHeader>
//         <Description></Description>
//         <DialogClose asChild>
//           <Button onClick={currentPostId ? updateContent : createContent}>
//             Submit
//           </Button>
//         </DialogClose>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default Tiptap;
