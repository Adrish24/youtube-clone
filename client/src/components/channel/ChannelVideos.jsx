import { useState } from "react";
import { useActiveChannel } from "../../hooks";
import { Card } from "../ui";
import UploadVideo from "./UploadVideo";
import axios from "axios";

const ChannelVideos = ({ channelVideos, channel }) => {
  const { activeChannel } = useActiveChannel();

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [formType, setFormType] = useState("");
  const [video, setVideo] = useState(null);

  const [processing, setProccessing] = useState(false);

  const handleDeleteVideo = async (e, videoId) => {
    e.preventDefault();
    e.stopPropagation();
    document.activeElement.blur();
    setProccessing(true);

    // API URL and token for authentication
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const token = localStorage.getItem("token");

    try {
      const res = await axios.delete(`${apiUrl}/api/videos/delete/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.comments);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const onClick = (type, vid) => {
    document.activeElement.blur();
    setTimeout(() => setShowUploadModal(true), 100);
    setFormType(type);
    setVideo(vid);
    console.log(vid);
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 pt-4">
      {channelVideos && channelVideos.length > 0 ? (
        channelVideos.map((vid) => (
          <Card
            key={vid._id}
            video={vid}
            // Pass styles as props
            styles={{
              cardContainer: "mb-5 px-2",
              thumbnail: "w-full aspect-video object-cover rounded-xl",
              cardBody: "flex relative",
              profile: "mt-3 mr-3 w-9",
              profileImage: "bg-gray-300 h-9 w-full rounded-full object-fit",
              metadataContainer: "grow pr-6 pt-3",
              title: "font-semibold line-clamp-2",
              uploader: "text-sm text-base-content/50 hover:text-base-content",
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
              {channel?.handle === activeChannel?.handle ? (
                <div
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 shadow-lg rounded-xl w-40 py-2 px-0 z-50"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClick("edit", vid);
                    }}
                    className="block px-4 py-2 text-sm hover:bg-base-content/20 w-full text-left cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => handleDeleteVideo(e, vid._id)}
                    className="block px-4 py-2 text-sm hover:bg-base-content/20 w-full text-left cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 shadow-lg rounded-xl w-40 py-2 px-0 z-50"
                >
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="block px-4 py-2 text-sm hover:bg-base-content/20 w-full text-left cursor-pointer"
                  >
                    Report
                  </button>
                </div>
              )}
            </div>
          </Card>
        ))
      ) : (
        // If no videos are found, display a message
        <div className=" md:col-span-2 lg:col-span-3 2xl:col-span-4 grid justify-center pt-20">
          {channel?.handle === activeChannel?.handle ? (
            <div className="flex flex-col items-center space-y-4">
              <h2>No video found. Please upload one.</h2>
              <button
                onClick={() => onClick("upload")}
                className="btn bg-base-content rounded-full text-base-300"
              >
                Upload
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <img
                className="w-40 h-40 object-fit"
                src="https://www.gstatic.com/youtube/img/channels/mobile/empty_channel/dark_800x800.png"
                alt=""
              />
              <h2>This channel doesn't have any content.</h2>
            </div>
          )}
        </div>
      )}

      {showUploadModal ? (
        <UploadVideo
          close={() => setShowUploadModal(false)}
          type={formType}
          video={video}
        />
      ) : null}

      {processing ? (
        <div className="fixed left-0 top-o right-0 bottom-0 bg-transparent"></div>
      ) : null}
    </div>
  );
};

export default ChannelVideos;
