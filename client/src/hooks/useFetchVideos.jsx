import { useDispatch, useSelector } from "react-redux";
import { videos } from "../data/videos";
import { useCallback, useEffect, useState } from "react";
import {
  setError,
  setIsLoading,
  setVideos,
} from "../context/redux/videosSlice";
import { VIDEO_CATEGORY } from "../constants/category";

const useFetchVideos = () => {
  const items = useSelector((state) => state.videos.items);
  const isLoading = useSelector((state) => state.videos.isLoading);
  const error = useSelector((state) => state.videos.error);

  const [activeCategory, setActiveCategory] = useState(VIDEO_CATEGORY[0]);

  const dispatch = useDispatch();

  // Simulating an API call with a timeout
  const fetchVideos = useCallback(async () => {
    dispatch(setIsLoading(true));
    dispatch(setError(null));
    setTimeout(() => {
      try {
        const filteredVideos = videos.filter(
          (video) =>
            video.category.includes(activeCategory) || activeCategory === "All"
        );
        // Dispatching the fetched videos to the Redux store
        dispatch(setVideos(filteredVideos));
      } catch (error) {
        console.log(error.message);
        dispatch(setError("Failed to fetch videos"));
      } finally {
        dispatch(setIsLoading(false));
      }
    }, 1000);
  }, [activeCategory, dispatch]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return { items, isLoading, error, activeCategory, setActiveCategory };
};

export default useFetchVideos;
