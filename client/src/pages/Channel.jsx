import { useEffect, useRef } from "react";
import { useFetchChannelData, useResizeWindow } from "../hooks";
import { useThemeContext } from "../context/ThemeProvider";
import { useParams } from "react-router-dom";

// Importing components for the channel page
import { ChannelBanner, ChannelMetadata } from "../components/channel";
import { Card } from "../components/ui";
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
        <div className="pt-6 w-full flex flex-col">
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
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:flex flex-col gap-4 pt-4">
            {channelVideos && channelVideos.length > 0 ? (
              channelVideos.map((vid) => (
                <Card
                  key={vid.videoId}
                  video={vid}
                  // Pass styles as props
                  styles={{
                    cardContainer: "mb-5 px-2",
                    thumbnail: "w-full aspect-video object-cover rounded-xl",
                    cardBody: "flex relative",
                    profile: "mt-3 mr-3 w-9",
                    profileImage:
                      "bg-gray-300 h-9 w-full rounded-full object-fit",
                    metadataContainer: "grow pr-6 pt-3",
                    title: "font-semibold line-clamp-2",
                    uploader:
                      "text-sm text-base-content/50 hover:text-base-content",
                    metadat: "text-sm text-base-content/50",
                  }}
                >
                  {/* addtional menu button for the card ui */}
                  {/* this button only shows when device width is large */}
                  <div className="absolute top-2 right-0 dropdown dropdown-end">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="btn btn-sm btn-circle btn-ghost hover:bg-base-content/20"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 24 24"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        focusable="false"
                        aria-hidden="true"
                      >
                        <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
                      </svg>
                    </button>
                    <div
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 shadow-lg rounded-xl w-40 py-2 px-0 z-50"
                    >
                      <button className="block px-4 py-2 text-sm hover:bg-base-content/20 w-full text-left cursor-pointer">
                        Edit
                      </button>

                      <button className="block px-4 py-2 text-sm hover:bg-base-content/20 w-full text-left cursor-pointer">
                        Delete
                      </button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div>
                <h2>No video found. Please upload one.</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channel;
