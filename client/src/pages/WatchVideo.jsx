import { useSearchParams } from "react-router-dom";

import {
  CommentSection,
  NoVideo,
  Suggestions,
  VideoPlayer,
  WatchMetaData,
} from "../components/watch";
import { useThemeContext } from "../context/ThemeProvider";
import { useFetchVideoById, useResizeWindow } from "../hooks";
import { useEffect, useState } from "react";
import { WatchVideoLoader } from "../components/ui/Loader";

const WatchVideo = () => {
  const [searchParams] = useSearchParams();

  const videoId = searchParams.get("v");

  const { currentVideo, suggestedVideos, isLoading, error } =
    useFetchVideoById(videoId);

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

  if (isLoading) return <WatchVideoLoader />;

  // if there is an error show NoVideo component
  if (error) return <NoVideo />;

  // If currentVideo is found, Render the video player, metadata and suggested videos
  return (
    <div className="mt-16 p-2 bg-base-300 flex justify-center pb-20">
      <div className="flex flex-col lg:flex-row w-full h-full 2xl:w-[90vw]">
        <div className="w-full lg:pr-6 lg:pt-6 lg:ml-6">
          <VideoPlayer src={currentVideo?.video} title={currentVideo?.title} />
          <div id="video-metadata" className="py-4 lg:w-[640px] xl:w-[800px] 2xl:w-[1062px]">
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
