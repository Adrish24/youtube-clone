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
      className="flex-2 grid justify-center p-3 mt-24 md:ml-20  bg-base-300"
    >
      <div
        id="categories"
        ref={categoryRef}
        className="
        fixed 
        top-14 
        h-14 w-full
        bg-base-300/85 z-1
        flex items-center space-x-2 overflow-y-hidden overflow-x-auto
        "
      >
        <VideoFilter />
      </div>
      <div className="relative -z-0">
        <VideoGrid />
      </div>
    </div>
  );
};

export default Home;
