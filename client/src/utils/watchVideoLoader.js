import { videos } from "../data/videos";

// This function is used to load the video data for the WatchVideo page before rendering the component.
// It is used in the router configuration to fetch the current video and suggested videos based on the video ID from the URL.
export const watchVideoLoader = async ({ request }) => {
  const url = new URL(request.url);
  const videoId = url.searchParams.get("v");
  if (!videoId) {
    throw new Response("Video ID is required", { status: 400 });
  }

  const currentVideo = videos.find((vid) => vid.videoId === videoId);
  const suggestedVideos = videos.filter((vid) => vid.videoId !== videoId);

  return { currentVideo, suggestedVideos };
};
