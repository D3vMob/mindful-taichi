export interface PlaylistItem {
    kind: string;
    etag: string;
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: Thumbnail;
        medium: Thumbnail;
        high: Thumbnail;
      };
      channelTitle: string;
      playlistId: string;
      position: number;
      resourceId: {
        kind: string;
        videoId: string;
      };
    };
  }
  
  export interface Thumbnail {
    url: string;
    width: number;
    height: number;
  }
  
  export interface YouTubePlaylistResponse {
    kind: string;
    etag: string;
    items: PlaylistItem[];
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
  }