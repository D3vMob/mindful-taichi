import Link from "next/link";
import AdminCard from "~/components/admin/adminCard";
import ChannelCard from "~/components/admin/channelCard";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getAllPlaylists } from "~/server/channelsQueries";

import { getAllUsers } from "~/server/usersQueries";

export default async function AdminPage() {
  const userList = await getAllUsers();
  const channelList = await getAllPlaylists();

  return (
    <ProtectedRoute requiredRole="admin">
      <Tabs defaultValue="accounts" className="w-full md:max-w-2xl">
        <TabsList className="bg-neutral-0 flex gap-2 p-2">
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
        </TabsList>
        <TabsContent value="accounts">
          <div className="flex flex-col gap-2 pt-4">
            {userList.map((user) => (
              <div key={user.uuid}>
                <Link href={`/nav/admin/${user.uuid}/user/${user.name}`}>
                  <AdminCard user={user} />
                </Link>
              </div>
            ))}
            <Link href="/nav/admin/createUser/0">
              <Button>Create User</Button>
            </Link>
          </div>
        </TabsContent>
        <TabsContent value="playlists">
          <div className="flex flex-col gap-2 pt-4">
            {channelList.map((channel) => (
              <div key={channel.id}>
                <Link href={`/nav/admin/${channel.id}/channel/${channel.name}`}>
                  <ChannelCard channel={channel} />
                </Link>
              </div>
            ))}
            <Link href="/nav/admin/createChannel/0">
              <Button>Create Channel</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </ProtectedRoute>
  );
}
