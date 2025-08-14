import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

const Card = ({ video, styles, children }) => {
  const navigate = useNavigate();

  // Format view count and upload date for better readability
  const viewCount = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(video.views);

  // Format the upload date to a more readable format
  const uploadDate = new Date(video.uploadDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleNavigateToWatch = () => {
    navigate(`/watch?v=${video.videoId}`);
  };

  const handleNavigateToChannel = (e) => {
    e.stopPropagation(); // Prevent the card click event
    navigate(`/${video.handle}`);
  };

  return (
    <div className={` ${styles?.cardContainer}`}>
      <div
        onClick={handleNavigateToWatch}
        className={`card  bg-base-300 cursor-pointer  ${styles?.card}`}
      >
        {/* thumbnail */}
        <figure className={styles?.thumbnailContainer}>
          <img
            loading="lazy"
            className={styles?.thumbnail}
            src={video.thumbnailUrl}
            alt="Thumbnail"
          />
        </figure>
        {/* showcase all the metadata about the video */}
        <div className={styles?.cardBody}>
          {/* profile image */}
          <div>
            <div className={styles?.profile}>
              <Avatar
                avatar={video.profile}
                name={video.channelName}
                styles={{
                  avatar: styles?.profileImage,
                }}
              />
            </div>
          </div>

          {/* informations. e.g: title, view count, upload date */}
          <div className={styles?.metadataContainer}>
            <h2 title={video.title} className={styles?.title}>
              {video.title}
            </h2>
            <p
              onClick={handleNavigateToChannel}
              className={styles?.channelName}
            >
              {video.channelName}
            </p>
            <p className={styles?.metadata}>
              {viewCount} views - {uploadDate}
            </p>
          </div>
          {/* additional elements if needed */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
