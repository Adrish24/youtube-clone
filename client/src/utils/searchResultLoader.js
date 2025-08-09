import axios from "axios";

// This function is used to load the video data for the WatchVideo page before rendering the component.
// It is used in the router configuration to fetch the current video and suggested videos based on the video ID from the URL.
export const searchResultLoader = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("search_query");

  console.log("Search query:", query);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  try {
    const res = await axios.get(`${apiUrl}/api/search?q=${query}`);

    const { results } = res.data;
    return { results };
  } catch (error) {
    console.log(error);
    // If there's an error, return an empty object or handle the error as needed
    return { results: [] };
  }
};
