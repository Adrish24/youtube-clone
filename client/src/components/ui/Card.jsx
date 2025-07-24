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
    <div className="card bg-base-100 w-full shadow-sm">
      <figure className="flex">
        <img
          className="w-full aspect-video object-cover"
          src={video.thumbnailUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{video.title}</h2>
        <p>{video.uploader}</p>
        <p>
          {viewCount} - {uploadDate}
        </p>
      </div>
    </div>
  );
};

export default Card;
