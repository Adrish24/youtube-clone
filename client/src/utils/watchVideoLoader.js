import { videos } from "../data/videos";

export const watchVideoLoader = async ({ request }) => {
  const url = new URL(request.url);
  const videoId = url.searchParams.get("v");
  console.log("Video ID:", videoId);
  if (!videoId) {
    throw new Response("Video ID is required", { status: 400 });
  }

  const currentVideo = videos.find((vid) => vid.videoId === videoId);
  const suggestedVideos = videos.filter((vid) => vid.videoId !== videoId);

  return { currentVideo, suggestedVideos };
};
