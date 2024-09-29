import Navigation from "~/components/navigation";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { db } from "~/server/db";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const channelList = await db.query.channels.findMany();
  return (
    <ProtectedRoute>
      <div className="hidden h-screen flex-row gap-4 md:fixed md:left-0 md:top-16 md:z-10 md:flex">
        <Navigation channelList={channelList} />
      </div>
      <div className="flex items-start justify-center w-full overflow-x-hidden md:ml-48">
        {children}
      </div>
    </ProtectedRoute>
  );
}
