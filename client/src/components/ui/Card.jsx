import { useNavigate } from "react-router-dom";

const Card = ({ video }) => {
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

  const handleCardClick = () => {
    navigate(`/watch?v=${video.videoId}`);
  };

  const handleNavigateToChannel = (e) => {
    e.stopPropagation(); // Prevent the card click event
    const channleName = video.uploader.replace(/\s+/g, "").toLowerCase();
    navigate(`/@${channleName}`);
  };

  return (
    <div className="mb-10 px-2">
      <div
        onClick={handleCardClick}
        className="card  bg-neutral cursor-pointer"
      >
        <figure>
          <img
            loading="lazy"
            className="w-full aspect-video object-cover rounded-xl"
            src={video.thumbnailUrl}
            alt="Thumbnail"
          />
        </figure>
        <div className="flex">
          <div>
            <div className="mt-3 mr-3 w-9">
              <img
                src={video.profile}
                alt=""
                className="bg-gray-300 h-9 w-full rounded-full object-fit"
              />
            </div>
          </div>
          <div className="grow pr-6 pt-3">
            <h2 className="font-semibold line-clamp-2">{video.title}</h2>
            <p
              onClick={handleNavigateToChannel}
              className="text-sm text-base-content/50 hover:text-base-content"
            >
              {video.uploader}
            </p>
            <p className="text-sm text-base-content/50">
              {viewCount} - {uploadDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
