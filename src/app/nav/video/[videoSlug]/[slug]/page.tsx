import { ProtectedRoute } from "~/components/ProtectedRoute";
import { YoutubePlaylist } from "~/components/youtubPlaylist";

export default function VideoPage({
  params,
}: {
  params: { videoSlug: string; slug: string };
}) {
  return (
    <ProtectedRoute>
      <YoutubePlaylist playlistIdInput={params.slug} />
    </ProtectedRoute>
  );
}
