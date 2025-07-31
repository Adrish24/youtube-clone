import { useEffect, useRef, useState } from "react";
import TopRowMetadata from "./TopRowMetadata";
import CommentSection from "./CommentSection";

const WatchMetaData = ({ currentVideo }) => {
  const descriptionRef = useRef(null);

  const [isDescriptionLong, setIsDescriptionLong] = useState(false);
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(descriptionRef.current).lineHeight
      );
      const maxLineHeight = lineHeight * 3;
      setIsDescriptionLong(descriptionRef.current.scrollHeight > maxLineHeight);
    }
  }, [currentVideo.description]);

  // toggle description if there is more than 3 lines
  const toggleShowMore = () => {
    setShowMoreDescription((prev) => !prev);
  };

  // Format view count and upload date for better readability
  const viewCount = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(currentVideo.views);
  // Format the upload date to a more readable format
  const uploadDate = new Date(currentVideo.uploadDate).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
  return (
    <div className="flex flex-col space-y-2">
      {/* Top row of video metadata */}
      <TopRowMetadata currentVideo={currentVideo} />

      {/* Video descriptions */}
      <div className="bg-base-100  py-2 px-3 rounded-2xl ">
        <p className="text-sm font-semibold">
          {viewCount} views {uploadDate}
        </p>
        <p
          ref={descriptionRef}
          className={`text-sm ${
            showMoreDescription ? "" : "line-clamp-3"
          }   relative`}
        >
          {currentVideo.description}

          {isDescriptionLong ? (
            <span
              onClick={toggleShowMore}
              className="absolute bottom-0 right-0 pl-4 bg-linear-to-l from-base-100 from-70% to-transparent coursor-pointer"
            >
              {showMoreDescription ? "Show less" : "...more"}
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default WatchMetaData;
