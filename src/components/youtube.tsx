// 'use client';

// import { useState } from "react";
// import { env } from "~/env";
// import { fetchVideosFromChannel, type VideoItem } from "~/services/youtubeApi";





// // Usage in a Next.js component
// const MyComponent: React.FC = () => {
//   const [videos, setVideos] = useState<VideoItem[]>([]);

//   const fetchVideos = async () => {
//     try {
//       const playlistId = "PLR5AGVbHzZjIr0SfxaB16UG612v6qRQgF";
//       const apiKey = env.YOUTUBE_API_KEY;
//       const fetchedVideos = await fetchVideosFromChannel(playlistId, apiKey);
//       setVideos(fetchedVideos);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={fetchVideos}>Fetch Videos</button>
//       <ul>
//         {videos.map((video, index) => (
//           <li key={index}>{video.snippet.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MyComponent;
