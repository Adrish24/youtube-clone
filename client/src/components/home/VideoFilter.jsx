import { VIDEO_CATEGORY } from "../../constants/category";
import { useState } from "react";
import { Carousel } from "../ui";
import { useFetchVideos } from "../../hooks";

// This component renders a list of video categories
// and provides navigation arrows for scrolling through the categories.
// The categories are displayed in a carousel format.
const VideoFilter = ({ categoryRef }) => {
  const [activeCategory, setActiveCategory] = useState(VIDEO_CATEGORY[0]);
  const { isLoading } = useFetchVideos(activeCategory);

  if (isLoading) return null;

  return (
    <div
      id="categories"
      ref={categoryRef}
      className="
        fixed 
        top-14 left-0 md:left-20 right-4
        h-14 px-4
        z-1 bg-base-300/85
        flex items-center   
        "
    >
      {/* list of categories */}

      <Carousel
        categories={VIDEO_CATEGORY}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
    </div>
  );
};

export default VideoFilter;
