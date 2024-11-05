"use client";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useCurrentUserStore } from "~/store/useCurrentUsertStore";
export const UpdateSchedule = ({ scheduleId }: { scheduleId: number }) => {
  const { role } = useCurrentUserStore();
  return (
    <div>
      {role === "admin" && (
        <Link href={`/scheduleEditor/${scheduleId}`}>
          <Pencil size={18} className="hover:text-gray-400" />
        </Link>
      )}
    </div>
  );
};
