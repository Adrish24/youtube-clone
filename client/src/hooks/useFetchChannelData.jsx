import axios from "axios";
import { useEffect, useState } from "react";

const useFetchChannelData = (handle) => {
  const [channel, setChannel] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchChannelData() {
      setIsLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

      try {
        const res = await axios.get(`${apiUrl}/api/channel/${handle}`);

        const { channel, channelVideos } = res.data;
        setChannel(channel);
        setChannelVideos(channelVideos);
      } catch (error) {
        console.log(error);
        setError("Channel not found");
        throw new Error("Channel not found");
      } finally {
        setIsLoading(false);
      }
    }
    fetchChannelData();
  }, [handle]);

  return {
    channel,
    channelVideos,
    isLoading,
    error,
  };
};

export default useFetchChannelData;
