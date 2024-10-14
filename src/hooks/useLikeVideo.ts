import { useCurrentUserStore } from "~/store/useCurrentUsertStore";
import { useAuth } from "./useAuth";

// TODO: validate if it is still necessary
export const useLikeVideo = () => {
  const { setFav } = useCurrentUserStore();

  const { user } = useAuth();
  const toggleLikeVideo = async (videoId: string, videoIdList: string[]) => {
    if (videoIdList.includes(videoId)) {
      videoIdList = videoIdList.filter((id) => id !== videoId);
      setFav(videoIdList);
      await fetch(`/api/users/${user?.uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fav: videoIdList }),
      });
    } else {
      videoIdList.push(videoId);
      setFav(videoIdList);
      await fetch(`/api/users/${user?.uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fav: videoIdList }),
      });
    }
  };
  const isLikedVideo = (videoId: string, videoIdList: string[]) => {
    return videoIdList.includes(videoId);
  };

  return {
    isLikedVideo,
    toggleLikeVideo,
  };
};
