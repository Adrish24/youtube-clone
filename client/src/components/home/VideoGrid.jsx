import { Card } from "../ui";
import { useFetchVideos } from "../../hooks";

const VideoGrid = () => {
  const { isLoading, items } = useFetchVideos(); // Fetch videos from the custom hook

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 pt-6 relative">
      {items.map((video) => (
        <Card key={video.channelId} video={video} />
      ))}

      {/* Show a loading overlay if videos are still being fetched */}
      {isLoading ? (
        <div className="absolute top-0 bottom-0 w-full bg-base-300/80"></div>
      ) : null}
    </div>
  );
};

export default VideoGrid;
