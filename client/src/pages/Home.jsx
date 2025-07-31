import { useEffect, useRef } from "react";
import { VideoFilter, VideoGrid } from "../components/home";
import { useResizeWindow } from "../hooks";
import { useThemeContext } from "../context/ThemeProvider";

const Home = () => {
  const homeRef = useRef(null);
  const categoryRef = useRef(null);

  const windowWidth = useResizeWindow();

  const { isSidebarOpen } = useThemeContext();

  useEffect(() => {
    const homeElement = homeRef.current;
    const categoriesELement = categoryRef.current;

    if (homeElement && categoriesELement) {
      if (windowWidth < 1280) {
        homeElement.classList.remove("xl:ml-60");
        categoriesELement.classList.remove("xl:left-60");
        return;
      }

      if (windowWidth >= 1280 && isSidebarOpen) {
        homeElement.classList.add("xl:ml-60");
        categoriesELement.classList.add("xl:left-60");
        return;
      }
    }
  }, [isSidebarOpen, windowWidth]);

  return (
    <div
      ref={homeRef}
      id="home"
      className="flex px-2 mt-24 md:ml-20  bg-base-300"
    >
      {/* Video Filter Component */}
      <VideoFilter categoryRef={categoryRef} />

      {/* This is the main content area where the video grid will be displayed */}
      <VideoGrid />
    </div>
  );
};

export default Home;
