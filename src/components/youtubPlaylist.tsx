"use client";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Heart, Loader2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import YouTube, { type YouTubeProps } from "react-youtube";

import { env } from "~/env";
import {
  fetchVideosFromChannel,
  type YouTubePlaylistItem,
} from "~/services/youtubeApi";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useLikeVideo } from "~/hooks/useLikeVideo";
import { useCurrentUserStore } from "~/store/useCurrentUsertStore";

interface YoutubePlaylistProps {
  playlistIdInput: string;
}

export const YoutubePlaylist = ({ playlistIdInput }: YoutubePlaylistProps) => {
  const [videos, setVideos] = useState<YouTubePlaylistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [error, setError] = useState<string | null>(null);
  const { fav } = useCurrentUserStore();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const apiKey = env.NEXT_PUBLIC_YOUTUBE_API_KEY; // Fetch API key from env
        const fetchedVideos = await fetchVideosFromChannel(
          playlistIdInput,
          apiKey,
        );
        setVideos(fetchedVideos);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch videos.");
        setLoading(false);
      }
    };

    if (playlistIdInput) {
      void fetchVideos();
    }
  }, [playlistIdInput]);

  const playerWidth = "352";
  const playerHeight = "198";

  const playerRatio = {
    width: playerWidth,
    height: playerHeight,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null); // YouTube player reference

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    playerRef.current = event.target;
  };

  // Explicitly type the opts object
  const opts: YouTubeProps["opts"] = {
    height: playerRatio.height,
    width: playerRatio.width,
    playerVars: {
      autoplay: 0,
    },
  };

  const { isLikedVideo, toggleLikeVideo } = useLikeVideo();

  return (
    <div className="flex flex-wrap content-center items-center justify-center gap-4 pt-2">
      {loading ? (
        <Loader2Icon className="h-screen items-center justify-center size-16 animate-spin" />
      ) : error ? (
        <div>{error}</div>
      ) : (
        videos.map((video) => (
          <div
            key={video.snippet.resourceId.videoId}
            className="flex w-96 flex-col rounded-lg bg-gray-600 p-4"
          >
            <div className="flex flex-row items-center justify-between gap-4 pb-2">
              <div className="w-full text-center">
                <h3 className="text-xl font-bold text-white">
                  {video.snippet.title}
                </h3>
              </div>
              <Heart
                color="white"
                size={24}
                fill={
                  isLikedVideo(video.snippet.resourceId.videoId, fav ?? [])
                    ? "white"
                    : "transparent"
                }
                onClick={() =>
                  toggleLikeVideo(video.snippet.resourceId.videoId, fav ?? [])
                }
              />
            </div>
            <Dialog>
              <DialogTrigger>
                <Image
                  src={`${video.snippet?.thumbnails?.high?.url}`}
                  alt="Thumbnail"
                  width={video.snippet?.thumbnails?.high?.width}
                  height={video.snippet?.thumbnails?.high?.height}
                />
                <div className="max-h-28 w-full truncate text-wrap pt-4 text-justify text-sm text-gray-300">
                  {video.snippet.description.split("\n").map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              </DialogTrigger>
              <DialogContent className="bg-gray-600">
                <DialogHeader>
                  <DialogTitle className="text-center text-white">
                    {video.snippet.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center gap-4">
                  <YouTube
                    videoId={video.snippet.resourceId.videoId}
                    opts={opts}
                    onReady={onPlayerReady}
                  />
                  <DialogDescription></DialogDescription>
                  <div className="text-gray-300">
                    {video.snippet.description
                      .split("\n")
                      .map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))
      )}
    </div>
  );
};
