import { useState } from "react";
import { useActiveChannel } from "../../hooks";
import { Avatar } from "../ui";
import UploadVideo from "./UploadVideo";

const ChannelMetadata = ({ channel }) => {
  const { activeChannel } = useActiveChannel();

  const [showUploadModal, setShowUploadModal] = useState(false);

  // Format subscriber count for better readability
  const subs = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(channel?.subscribers);

  return (
    <div className="pt-4 px-4 sm:px-7 md:px-10 lg:px-10 xl:px-20 mx-auto w-full max-w-7xl">
      <div className="flex space-x-3 w-full">
        {/* Channel avatar and name */}
        <div className="w-18 h-18 md:w-30 md:h-30 lg:w-40 lg:h-40  rounded-full overflow-hidden">
          <div className="flex justify-center items-center bg-primary w-full h-full">
            <Avatar
              avatar={channel?.avatar}
              name={channel?.channelName}
              styles={{
                text: "text-4xl md:text-7xl font-semibold",
              }}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1 w-[80%]">
          <div className="flex ">
            <span className="text-2xl md:text-4xl font-semibold w-60 md:w-full truncate ">
              {channel?.channelName}
            </span>
          </div>

          {/* Channel handle, subscribers, and video count */}
          <div className="flex flex-wrap space-y-1 items-center">
            <div className="flex mr-2">
              <span className="text-xs font-semibold">{channel?.handle}</span>
            </div>
            <div className="flex items-center text-xs text-base-content/60">
              <span>{subs} subscribers</span>
              <span className="px-1">.</span>
              <span>
                {channel?.videos?.length > 1
                  ? channel?.videos?.length + " videos"
                  : channel?.videos?.length + " video"}{" "}
              </span>
            </div>
          </div>

          {/* channel description */}
          <div>
            <p className="flex items-center text-xs text-base-content/60">
              {channel?.description}
            </p>
          </div>
          {channel?.handle === activeChannel?.handle ? (
            <div className="flex mt-2 space-x-4">
              <button
                title="upload a video"
                onClick={() => setShowUploadModal(true)}
                className="btn bg-base-content rounded-full text-base-300"
              >
                Upload
              </button>
              <button
                title="manage your videos"
                className="btn bg-base-content rounded-full text-base-300"
              >
                Manage videos
              </button>
            </div>
          ) : (
            <div className="flex space-x-3 mt-3">
              <button
                title="Join Channel"
                className="btn bg-neutral-900 hover:bg-neutral-800 text-white rounded-3xl mr-2"
              >
                Join
              </button>
              <button
                title="Subscribe to Channel"
                className="btn bg-base-content hover:bg-base-content/90 text-base-300 rounded-3xl"
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
        {showUploadModal ? (
          <UploadVideo
            close={() => setShowUploadModal(false)}
            type={"upload"}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ChannelMetadata;
