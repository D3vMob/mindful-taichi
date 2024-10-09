import { CreateChannel } from "~/components/admin/createChannelPage";

export default async function AdminPage({
  params,
}: {
  params: { idSlug: string };
}) {
  return (
    <div>
      <CreateChannel params={params} />
    </div>
  );
}
