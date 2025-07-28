import { useDispatch } from "react-redux";
import { videos } from "../data/videos";
import { useCallback, useEffect, useRef, useState } from "react";
import { setVideos } from "../context/redux/videosSlice";

const useFetchVideos = (category) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const timeoutRef = useRef(null);

  const dispatch = useDispatch();

  // Simulating an API call with a timeout
  const fetchVideos = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      try {
        const filteredVideos = videos.filter(
          (video) => video.category.includes(category) || category === "All"
        );
        // Dispatching the fetched videos to the Redux store
        dispatch(setVideos(filteredVideos));
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  }, [category, dispatch]);

  useEffect(() => {
    fetchVideos();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Clear timeout on unmount
      }
    };
  }, [fetchVideos]);

  return { isLoading, error };
};

export default useFetchVideos;
