import { YoutubePlaylist } from "~/components/youtubPlaylist";

export default function VideoPage({params}: {params: {videoSlug: string, slug: string}}) {


  return (
    <div>
      <YoutubePlaylist playlistIdInput={params.slug} />
    </div>
  );
}
