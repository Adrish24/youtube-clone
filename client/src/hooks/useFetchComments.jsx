import axios from "axios";
import { useCallback, useState } from "react";

const useFetchComments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchComments = useCallback(async (videoId) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${apiUrl}/comments/${videoId}`);
      if (res.status === 200) {
        setComments(res.data.comments);
      } else {
        setComments([]);
        setError("No comments found");
      }
    } catch (error) {
      console.log(error.message);
      setError("No comments found");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { comments, isLoading, error, fetchComments };
};

export default useFetchComments;
