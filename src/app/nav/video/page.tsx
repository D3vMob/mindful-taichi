import { Heart } from "lucide-react";
import YouTubePlayer from "~/components/youtubePlayer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function VideoPage() {
  return (
    <div className="flex flex-col gap-4">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="p-1 rounded-none gap-1 overflow-x-scroll whitespace-nowrap">
          <TabsTrigger value="mtc">Mindful TaiChi</TabsTrigger>
          <TabsTrigger value="mdf">Mindfulness</TabsTrigger>
          <TabsTrigger value="TBD">Mindfulness</TabsTrigger>
          <TabsTrigger value="TBD">Mindfulness</TabsTrigger>
          <TabsTrigger value="TBD">Mindfulness</TabsTrigger>
        </TabsList>
        <TabsContent value="mtc" className="flex grow gap-4 px-4">
          <div className="flex flex-col rounded-lg bg-gray-600 p-4 w-auto">
            <div className="flex flex-row items-center justify-center gap-4 pb-2">
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
        </TabsContent>
        <TabsContent value="mdf">no video yet</TabsContent>
        <TabsContent value="TBD">no video yet</TabsContent>
      </Tabs>
    </div>
  );
}
