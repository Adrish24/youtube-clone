import { VIDEO_CATEGORY } from "../../constants/category";
import { useFetchVideos } from "../../hooks";



import { Carousel } from "../ui";

// This component renders a list of video categories
// and provides navigation arrows for scrolling through the categories.
// The categories are displayed in a carousel format.
// It uses the `useFetchVideos` hook to get the active category and set it when a category is clicked.
// The `categoryRef` is used to position the component correctly in the layout.
const VideoFilter = ({ categoryRef }) => {
  const { isLoading, activeCategory, setActiveCategory } = useFetchVideos();

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
