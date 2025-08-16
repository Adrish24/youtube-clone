import axios from "axios";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComments } from "../context/redux/commentSlice";

const useFetchComments = () => {
  const comments = useSelector((state) => state.comments.data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Function to fetch comments for a specific video
  // This function can be called with the video ID to fetch comments
  const fetchComments = useCallback(
    async (videoId) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${apiUrl}/api/comments/${videoId}`);
        dispatch(setComments(res.data.comments));
      } catch (error) {
        console.log(error.message);
        setError("No comments found");
      } finally {
        setIsLoading(false);
      }
    },
    [apiUrl, dispatch]
  );

  return { comments, isLoading, error, fetchComments };
};

export default useFetchComments;
