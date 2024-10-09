import { CreateUpdateUser } from "~/components/admin/createUpdateUser";
import { getAllPlaylists } from "~/server/channelsQueries";

export default async function AdminPage({
  params,
}: {
  params: { idSlug: string };
}) {
  const channelList = await getAllPlaylists();
  return (
    <>
      <CreateUpdateUser selections={channelList} params={params} />
    </>
  );
}
