import { useEffect, useState } from "react";

const useResizeWindow = (initalWidth = window.innerWidth) => {
  const [windowWdth, setWindowWidth] = useState(initalWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWdth;
};

export default useResizeWindow;
