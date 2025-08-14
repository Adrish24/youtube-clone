import { useEffect, useRef } from "react";
import { useFetchChannelData, useResizeWindow } from "../hooks";
import { useThemeContext } from "../context/ThemeProvider";
import { useParams } from "react-router-dom";

// Importing components for the channel page
import {
  ChannelBanner,
  ChannelMetadata,
  ChannelVideos,
} from "../components/channel";

import NotFound from "./NotFound";

const Channel = () => {
  const { handle } = useParams();

  const { channel, channelVideos, isLoading, error } =
    useFetchChannelData(handle);

  const channelRef = useRef(null);

  const windowWidth = useResizeWindow();

  const { isSidebarOpen } = useThemeContext();

  useEffect(() => {
    const channelElement = channelRef.current;

    if (channelElement) {
      if (windowWidth < 1280) {
        channelElement.classList.remove("xl:ml-60");
        return;
      }

      if (windowWidth >= 1280 && isSidebarOpen) {
        channelElement.classList.add("xl:ml-60");
        return;
      }
    }
  }, [isSidebarOpen, windowWidth]);

  if (isLoading) return null;
  if (error) return <NotFound />;

  return (
    <div ref={channelRef} id="channel" className="mt-14 md:ml-20 min-h-screen ">
      <div className="flex flex-col items-center">
        <div className="pt-6 w-full flex flex-col mb-5">
          <ChannelBanner channelBanner={channel?.channelBanner} />

          {/* Metadata about the channel */}
          <ChannelMetadata channel={channel} />
        </div>
        <div className="px-4 sm:px-7 md:px-10 lg:px-10 xl:px-20 mx-auto w-full max-w-7xl">
          <div className="h-12 flex items-center">
            <h2 className="text-lg font-semibold mx-2 pb-1 border-b-2 border-base-content">
              Videos
            </h2>
          </div>
          <ChannelVideos channelVideos={channelVideos} channel={channel} />
        </div>
      </div>
    </div>
  );
};

export default Channel;
