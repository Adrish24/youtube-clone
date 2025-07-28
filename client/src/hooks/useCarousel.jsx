import { useEffect, useRef, useState } from "react";

const useCarousel = () => {
  const carouselRef = useRef(null);

  const [showLeftScrollButton, setShowLeftScrollButton] = useState(false);
  const [showRightScrollButton, setShowRightScrollButton] = useState(false);

  // This function checks the scroll position of the carousel
  // and updates the visibility of the left and right scroll buttons.
  // It uses the `scrollLeft`, `scrollWidth`, and `clientWidth` properties
  // to determine if the user has scrolled left or right.
  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      console.log(scrollLeft, scrollWidth, clientWidth);

      // Show the left scroll button if the user has scrolled left
      // This is determined by checking if `scrollLeft` is greater than 0.
      setShowLeftScrollButton(scrollLeft > 0);

      // Show the right scroll button if the user has not scrolled to the end
      // This is determined by checking if the sum of `scrollLeft` and `clientWidth` is less than `scrollWidth`.
      // This means there are more items to scroll to the right.
      // The `- 1` is used to account for any potential rounding issues.
      // This ensures that the right button is shown only when there are more items to view.
      setShowRightScrollButton(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    // Initialize the carouselRef to the current element
    const carouselElement = carouselRef.current;

    if (carouselElement) {
      checkScrollPosition(); // Check initial scroll position
    }

    carouselElement.addEventListener("scroll", checkScrollPosition);

    return () => {
      carouselElement.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  // Functions to handle scrolling left and right
  // These functions scroll the carousel by a fixed amount (300px) when the buttons are clicked
  // This allows users to navigate through the categories easily.
  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  // This function scrolls the carousel to the left by a fixed amount (300px)
  // It is triggered when the left scroll button is clicked.
  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  return {
    carouselRef,
    showLeftScrollButton,
    showRightScrollButton,
    handleScrollLeft,
    handleScrollRight,
  };
};

export default useCarousel;
