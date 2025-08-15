import { useFetchVideos } from "../../hooks";
import { Card } from "../ui";

const VideoGrid = () => {
  const { isLoading, items } = useFetchVideos(); // Fetch videos from the custom hook

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 pt-6 relative">
      {items.map((video) => (
        <Card
          key={video._id}
          video={video}
          // Pass styles as props
          styles={{
            cardContainer: "mb-5 px-2",
            thumbnail: "w-full aspect-video object-cover rounded-xl",
            cardBody: "flex",
            profile: "mt-3 mr-3 w-9",
            profileImage: "bg-gray-300 h-9 w-full rounded-full object-fit",
            metadataContainer: "grow pr-6 pt-3",
            title: "font-semibold line-clamp-2",
            uploader: "text-sm text-base-content/50 hover:text-base-content",
            metadata: "text-sm text-base-content/50",
          }}
        />
      ))}

      {/* Show a loading overlay if videos are still being fetched */}
      {isLoading ? (
        <div className="absolute top-0 bottom-0 w-full bg-base-300/80"></div>
      ) : null}
    </div>
  );
};

export default VideoGrid;
