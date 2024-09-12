'use client';

type Thumbnails = Record<string, {
    url: string;
    width: number;
    height: number;
  }>;

export interface YouTubePlaylistItem {
  kind: 'youtube#playlistItem';
  etag: string;
  id: string;
  snippet: {
    publishedAt: string; // datetime is typically represented as a string
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
  };
  contentDetails: {
    videoId: string;
    startAt: string;
    endAt: string;
    note: string;
    videoPublishedAt: string; // datetime as a string
  };
  status: {
    privacyStatus: string;
  };
}



export async function fetchVideosFromChannel(
    playlistId: string,
    apiKey: string,
  ): Promise<YouTubePlaylistItem[]> {
    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=200`;
  
    const response = await fetch(url);
  
    if (response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return data.items ?? [];
    } else {
      throw new Error("Failed to fetch videos");
    }
  }