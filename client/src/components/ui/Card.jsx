const Card = ({ video }) => {
  const viewCount = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(video.views);

  const uploadDate = new Date(video.uploadDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mb-10 px-2">
      <div className="card  bg-base-300 cursor-pointer">
        <figure>
          <img
            className="w-full aspect-video object-cover rounded-xl"
            src={video.thumbnailUrl}
            alt="Thumbnail"
          />
        </figure>
        <div className="flex">
          <div className="">
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
            <p className="text-sm text-base-content/50 hover:text-base-content">
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
