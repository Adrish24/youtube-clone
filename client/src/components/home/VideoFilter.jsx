import { Link } from "react-router-dom";
import { VIDEO_CATEGORY } from "../../constants/category";

const VideoFilter = () => {
  return (
    <div className="flex items-center whitespace-nowrap">
      {VIDEO_CATEGORY.map((category) => (
        <Link>{category}</Link>
      ))}
      <button> right </button>
    </div>
  );
};

export default VideoFilter;
