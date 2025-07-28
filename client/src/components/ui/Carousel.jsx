import { Link } from "react-router-dom";
import { useCarousel } from "../../hooks";

const Carousel = ({ categories, activeCategory, setActiveCategory }) => {
  const {
    carouselRef,
    showLeftScrollButton,
    showRightScrollButton,
    handleScrollLeft,
    handleScrollRight,
  } = useCarousel(); // Custom hook to manage carousel functionality

  return (
    <div ref={carouselRef} className="carousel carousel-start gap-3">
      {categories.map((category) => (
        <Link
          title={category}
          onClick={() => setActiveCategory(category)}
          key={category}
          className={`
              carousel-item 
              text-sm 
              font-semibold p-2 
              bg-base-100 rounded-lg
              ${
                activeCategory === category
                  ? "bg-base-content text-neutral"
                  : ""
              }
              `}
        >
          {category}
        </Link>
      ))}

      {/* Navigation arrows for scrolling */}
      {/* Right navigation arrow for scrolling */}
      {showRightScrollButton ? (
        <div className="absolute right-0 top-0 bottom-0 flex items-center">
          <div className="p-8"></div>
          <div className="pr-2 rounded-s-full bg-base-300">
            <button
              title="Next"
              onClick={handleScrollRight}
              className="btn btn-circle btn-neutral hover:bg-base-content/30 fill-base-content"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path d="m9.4 18.4-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      ) : null}

      {/* Left navigation arrow for scrolling */}
      {showLeftScrollButton ? (
        <div className="absolute left-0 top-0 bottom-0  flex items-center">
          <div className="pl-2 rounded-e-full bg-base-300">
            <button
              title="Previous"
              onClick={handleScrollLeft}
              className="btn btn-circle btn-neutral hover:bg-base-content/30 fill-base-content"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path d="M14.96 18.96 8 12l6.96-6.96.71.71L9.41 12l6.25 6.25-.7.71z"></path>
                </svg>
              </div>
            </button>
          </div>
          <div className="p-8"></div>
        </div>
      ) : null}
    </div>
  );
};

export default Carousel;
