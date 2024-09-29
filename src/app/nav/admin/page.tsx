import Link from "next/link";
import AdminCard from "~/components/admin/adminCard";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { db } from "~/server/db";

export default async function AdminPage() {
  const userList = await db.query.users.findMany({});

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="flex flex-col gap-2 pt-4">
        {userList.map((user) => (
          <div key={user.uuid}>
            <Link href={`/nav/admin/${user.uuid}`}>
              <AdminCard user={user} />
            </Link>
          </div>
        ))}
      </div>
    </ProtectedRoute>
  );
}
