import { videos } from "../../data/videos";
import { Card } from "../ui";

const VideoGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grod-cols-3 2xl:grid-cols-4 gap-4">
      {videos.map((video) => (
        <Card key={video.channelId} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
