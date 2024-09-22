"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import Tiptap from "./Tiptap";



const Post = ({ post, postId }: { post?: string, postId?: number }) => {
  const [content, setContent] = useState<string>(post ?? "");
  const router = useRouter();
  const handleContentChange = (reason: string) => {
    setContent(reason);
  };

  const handleSubmit = async (content: string) => {
    if (postId) {
      try {
        const res = await fetch(`/api/posts/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: content,
            id: postId,
          }),
        });
        if (!res.ok) {
          throw new Error("Error updating content");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setContent("");
        router.refresh();
        router.push("/");
      }
    } else {
      try {
        const res = await fetch(`/api/posts/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        });

        if (!res.ok) {
          throw new Error("Error creating content");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setContent("");
        router.refresh();
        router.push("/");
      }
    }
  };

  return (
    <div className="w-full pt-10 md:px-40">
      <div className="pb-8 text-center text-3xl">
        {post ? "Edit Post" : "Create Post"}
      </div>
      <Tiptap
        content={content}
        onChange={(newContent: string) => handleContentChange(newContent)}
        post={() => handleSubmit(content)}
      />
    </div>
  );
};

export default Post;
