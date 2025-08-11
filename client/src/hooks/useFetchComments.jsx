import axios from "axios";
import { useCallback, useState } from "react";

const useFetchComments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchComments = useCallback(
    async (videoId) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${apiUrl}/api/comments/${videoId}`);
        console.log(res.data.comments);
        setComments(res.data.comments);
      } catch (error) {
        console.log(error.message);
        setError("No comments found");
      } finally {
        setIsLoading(false);
      }
    },
    [apiUrl]
  );

  return { comments, setComments, isLoading, error, fetchComments };
};

export default useFetchComments;
