"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Tiptap from "../editor/Tiptap";
import { refreshSchedule } from "~/lib/actions";

const ScheduleEditor = ({
  schedule,
  scheduleId,
}: {
  schedule?: string;
  scheduleId?: number;
}) => {
  const [content, setContent] = useState<string>(schedule ?? "");
  const router = useRouter();

  const handleSubmit = async () => {
    const method = scheduleId ? "PUT" : "POST";
    const url = scheduleId ? `/api/schedule/${scheduleId}` : `/api/schedule`;
    const body = scheduleId
      ? JSON.stringify({ content: content, id: scheduleId })
      : JSON.stringify({ content });

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error("Failed to save schedule");
      }

      await refreshSchedule();
      router.push("/");
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  };

  return (
    <div className="w-full pt-10 md:px-40">
      <div className="pb-8 text-center text-3xl">
        {scheduleId ? "Edit Schedule" : "Create Schedule"}
      </div>
      <Tiptap
        content={content}
        onChange={(newContent: string) => setContent(newContent)}
        post={handleSubmit}
      />
    </div>
  );
};

export default ScheduleEditor;
