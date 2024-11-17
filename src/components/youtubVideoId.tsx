"use client";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Heart, Loader2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import YouTube, { type YouTubeProps } from "react-youtube";

import { env } from "~/env";
import {
  fetchListOfVideoById,
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
import { cn } from "~/lib/utils";
import { useAuth } from "~/context/authContext";

const apiKey = env.NEXT_PUBLIC_YOUTUBE_API_KEY;
export const YoutubeVideoId = () => {
  const [videos, setVideos] = useState<YouTubePlaylistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserFavorites = async () => {
      if (!user?.uid) return;
      try {
        const response = await fetch(`/api/users/${user.uid}`);
        if (!response.ok) throw new Error("Failed to fetch favorites");
        const data = await response.json();
        setFavorites(data.user.fav ?? []);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    void fetchUserFavorites();
  }, [user?.uid]);

  useEffect(() => {
    if (favorites === null) {
      return;
    }
    const fetchVideos = async () => {
      try {
        const fetchedVideosPromises = favorites.map((videoId) =>
          fetchListOfVideoById(videoId, apiKey),
        );
        const fetchedVideosArrays = await Promise.all(fetchedVideosPromises);
        const allFetchedVideos = fetchedVideosArrays.flat();
        setVideos(allFetchedVideos);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch videos.");
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      void fetchVideos();
    } else {
      setLoading(false);
    }
  }, [favorites]);

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
        <Loader2Icon className="size-16 h-screen animate-spin items-center justify-center" />
      ) : error ? (
        <div>{error}</div>
      ) : favorites === null || favorites.length === 0 ? (
        <div>No favorites</div>
      ) : (
        videos.map((video) => (
          <div
            key={video.id}
            className="flex w-96 flex-col rounded-lg bg-accent px-4 py-2"
          >
            <div className="flex flex-row items-center justify-between gap-4 pb-2">
              <div className="w-full text-center">
                <h3 className="text-xl font-bold text-white">
                  {video.snippet.title}
                </h3>
              </div>
              <Heart
                className={cn(
                  "cursor-pointer text-accent-foreground",
                  isLikedVideo(video.id, favorites ?? [])
                    ? "fill-accent-foreground"
                    : "",
                )}
                size={24}
                onClick={async () => {
                  const updatedFavorites = await toggleLikeVideo(
                    video.id, // Using video.id directly instead of resourceId
                    favorites,
                  );
                  setFavorites(updatedFavorites);
                }}
              />
            </div>
            <Dialog>
              <DialogTrigger>
                <Image
                  src={`${video.snippet?.thumbnails?.high?.url}`}
                  alt="Thumbnail"
                  width={video.snippet?.thumbnails?.high?.width}
                  height={video.snippet?.thumbnails?.high?.height}
                  className="shadow-lg"
                />
                <div className="max-h-28 w-full truncate text-wrap pt-4 text-justify text-sm text-accent-foreground">
                  {video.snippet.description.split("\n").map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              </DialogTrigger>
              <DialogContent className="bg-gray-600">
                <DialogHeader>
                  <DialogTitle className="text-center text-accent-foreground">
                    {video.snippet.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center gap-4">
                  <YouTube
                    videoId={video.id}
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
