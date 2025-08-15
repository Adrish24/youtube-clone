import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
  setError,
  setIsLoading,
  setVideos,
} from "../context/redux/videosSlice";
import { VIDEO_CATEGORY } from "../constants/category";
import axios from "axios";

const useFetchVideos = () => {
  const items = useSelector((state) => state.videos.items);
  const isLoading = useSelector((state) => state.videos.isLoading);
  const error = useSelector((state) => state.videos.error);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [activeCategory, setActiveCategory] = useState(VIDEO_CATEGORY[0]);

  const dispatch = useDispatch();

  // Simulating an API call with a timeout
  const fetchVideos = useCallback(async () => {
    dispatch(setIsLoading(true));
    dispatch(setError(null));

    // Fetching videos based on the active category
    try {
      const res = await axios.get(
        `${apiUrl}/api/videos?category=${activeCategory}`
      );
      // Dispatching the fetched videos to the Redux store
      dispatch(setVideos(res.data.videos));
    } catch (error) {
      console.log(error.message);
      dispatch(setError("No videos found"));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [activeCategory, apiUrl, dispatch]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return { items, isLoading, error, activeCategory, setActiveCategory };
};

export default useFetchVideos;
