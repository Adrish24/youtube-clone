import { videos } from "../../data/videos";
import { Card } from "../ui";

const VideoGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 pt-6 overflow-y-auto">
      {videos.map((video) => (
        <Card key={video.channelId} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
