import axios from "axios";

// This function is used to load the video data for the WatchVideo page before rendering the component.
// It is used in the router configuration to fetch the current video and suggested videos based on the video ID from the URL.
export const watchVideoLoader = async ({ request }) => {
  const url = new URL(request.url);
  const videoId = url.searchParams.get("v");

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  try {
    const res = await axios.get(`${apiUrl}/watch/${videoId}`);
    if (res.status === 200) {
      const { currentVideo, suggestedVideos } = res.data;
      return { currentVideo, suggestedVideos };
    }
    return { currentVideo: null, suggestedVideos: [] };
  } catch (error) {
    console.log(error);
    // If there's an error, return an empty object or handle the error as needed
    return { currentVideo: null, suggestedVideos: [] };
  }
};
