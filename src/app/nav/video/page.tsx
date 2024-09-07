import { Heart } from "lucide-react";
import YouTubePlayer from "~/components/youtubePlayer";

export default function VideoPage() {
  return (
    <div className="m-4 flex flex-col items-center justify-center gap-4">
      <div className="flex w-full flex-col items-center justify-center rounded-lg bg-gray-600 p-4 md:w-96">
        <div className="pb-2 flex flex-row items-center justify-center gap-4">
          <h1 className="text-2xl font-bold text-white">
            Welcome to Mindful TaiChi!
          </h1>
          <Heart color="white" size={24} />
        </div>
        <YouTubePlayer videoId={"bgFxWV9oOgA"} />
        <p className="text-justify!important w-full pt-4 text-sm text-gray-300">
          This is a video player component.
        </p>
      </div>
    </div>
  );
}
