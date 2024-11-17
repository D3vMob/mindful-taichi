import { useAuth } from "./useAuth";

// TODO: validate if it is still necessary
export const useLikeVideo = () => {
  const { user } = useAuth();

  const toggleLikeVideo = async (videoId: string, videoIdList: string[]) => {
    let updatedFavorites: string[];

    if (videoIdList.includes(videoId)) {
      updatedFavorites = videoIdList.filter((id) => id !== videoId);
    } else {
      updatedFavorites = [...videoIdList, videoId];
    }

    await fetch(`/api/users/${user?.uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fav: updatedFavorites }),
    });

    return updatedFavorites;
  };

  const isLikedVideo = (videoId: string, videoIdList: string[]) => {
    return videoIdList.includes(videoId);
  };

  return {
    isLikedVideo,
    toggleLikeVideo,
  };
};
