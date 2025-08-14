import axios from "axios";
import { useEffect, useState } from "react";

const useFetchVideoById = (videoId) => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoById = async () => {
      setIsLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      try {
        const res = await axios.get(`${apiUrl}/api/watch/${videoId}`);
        const { currentVideo, suggestedVideos } = res.data;
        setCurrentVideo(currentVideo);
        setSuggestedVideos(suggestedVideos);
      } catch (error) {
        console.log(error);
        setError("Video not found");
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideoById();
  }, [videoId]);

  return {
    currentVideo,
    suggestedVideos,
    isLoading,
    error,
  };
};

export default useFetchVideoById;
