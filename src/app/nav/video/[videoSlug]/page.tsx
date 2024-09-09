import { Heart } from "lucide-react";
import YouTubePlayer from "~/components/youtubePlayer";

const videoList = ["bgFxWV9oOgA", "7elow8nV0GI", "88Wk2fLO7eE"];

export default function VideoPage() {
  return (
    <div className="flex-wrap flex gap-4 justify-center content-center pt-2 items-center">
      {videoList.map((id, index) => {
        return (
          <div key={index}>
            <VideoComponent id={id} />
          </div>
        );
      })}
    </div>
  );
}

const VideoComponent = ({ id }: { id: string }) => {
  return (
    <div className="flex w-96 flex-col rounded-lg bg-gray-600 p-4">
      <div className="flex flex-row items-center justify-center gap-4 pb-2">
        <h3 className="text-xl font-bold text-white">
          Welcome to Mindful TaiChi!
        </h3>
        <Heart color="white" size={24} />
      </div>
      <YouTubePlayer videoId={id} />
      <p className="text-justify!important w-full pt-4 text-sm text-gray-300">
        This is a video player component.
      </p>
    </div>
  );
};
