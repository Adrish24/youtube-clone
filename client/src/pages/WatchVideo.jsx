import { useLoaderData } from "react-router-dom";

import {
  CommentSection,
  NoVideo,
  Suggestions,
  WatchMetaData,
} from "../components/watch";
import { useThemeContext } from "../context/ThemeProvider";
import { useResizeWindow } from "../hooks";
import { useEffect, useState } from "react";

const WatchVideo = () => {
  const { currentVideo, suggestedVideos } = useLoaderData();

  const [isSmallDevice, setIsSmallDevice] = useState(false);

  const { mainContentRef } = useThemeContext(); // Reference to the main content area

  const windowWidth = useResizeWindow(); // Get the current window width

  // Check if the device is small based on window width
  useEffect(() => {
    if (windowWidth < 1024) {
      setIsSmallDevice(true);
    } else {
      setIsSmallDevice(false);
    }
  }, [windowWidth]);

  if (mainContentRef.current) {
    mainContentRef.current.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  // If currentVid is not found, display a message
  // This is used to handle cases where the video ID is invalid or the video has been removed
  // If currentVideo is null or undefined, return the NoVideo component
  if (!currentVideo) return <NoVideo />;

  // If currentVideo is found, Render the video player, metadata and suggested videos

  return (
    <div className="mt-14 p-2 bg-base-300 flex justify-center pb-20">
      <div className="flex flex-col lg:flex-row w-full h-full 2xl:w-[90vw]">
        <div className="w-full lg:pr-6 lg:pt-6 lg:ml-6">
          <iframe
            id="video-player"
            loading="lazy"
            className="
            w-full lg:w-[640px] xl:w-[800px] 2xl:w-[1062px]
            h-50 md:h-[432px] lg:h-90 xl:h-[450px] 2xl:h-[597px] 
            rounded-2xl
            "
            src={`${currentVideo.src}?autoplay=1&mute=1`}
            title={currentVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div className="py-4 lg:w-[640px] xl:w-[800px] 2xl:w-[1062px]">
            {/* Title of the video */}
            <h2
              title={currentVideo.title}
              className="text-lg font-bold line-clamp-2"
            >
              {currentVideo.title}
            </h2>

            {/* video metadata */}
            <WatchMetaData currentVideo={currentVideo} />
          </div>
          {!isSmallDevice ? (
            <CommentSection currentVideo={currentVideo} />
          ) : null}
        </div>

        {/* showcase for suggested videos */}
        <Suggestions suggestions={suggestedVideos} />

        {/* Comment section */}
        {isSmallDevice ? <CommentSection currentVideo={currentVideo} /> : null}
      </div>
    </div>
  );
};

export default WatchVideo;
