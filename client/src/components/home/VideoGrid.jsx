import { useSelector } from "react-redux";
import { Card } from "../ui";

const VideoGrid = () => {
  const videos = useSelector((state) => state.videos.items);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 pt-6 ">
      {videos.map((video) => (
        <Card key={video.channelId} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
