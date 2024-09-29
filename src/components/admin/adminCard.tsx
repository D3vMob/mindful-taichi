import { Pencil } from "lucide-react";
import { type Users } from "~/server/db/schema";

interface AdminCardProps {
  user: Users;
}

export default function AdminCard({ user }: AdminCardProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border-2 border-gray-300 px-2 py-1 min-w-full md:min-w-96 hover:border-gray-400">
      <div className="flex flex-col justify-between">
        <h4 className="text-xl font-bold text-black">
        {user.surname} {user.name} 
        </h4>
        <div className="text-sm text-gray-600">
          {user.email}
        </div>
      </div>
      <div>{user.role}</div>
    </div>
  );
}
