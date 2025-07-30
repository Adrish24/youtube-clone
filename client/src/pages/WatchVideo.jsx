import { useLoaderData, useNavigate } from "react-router-dom";
import { Card } from "../components/ui";

import { WatchMetaData } from "../components/watch";

const WatchVideo = () => {
  const { currentVideo, suggestedVideos } = useLoaderData();

  const navigate = useNavigate();

  // If currentVid is not found, display a message
  if (!currentVideo)
    return (
      <div className="relative top-14 pt-36 flex flex-col items-center-safe">
        <img
          id="img"
          draggable="false"
          class=" w-60 h-40 object-cover"
          alt=""
          src="https://www.youtube.com/img/desktop/unavailable/unavailable_video_dark_theme.png"
        ></img>
        <p className="text-xl font-semibold m-auto my-6">
          This video isn't available anymore
        </p>
        <button
          onClick={() => navigate("/")}
          className="btn btn-info btn-outline rounded-full"
        >
          Go To Home
        </button>
      </div>
    );

  // If currentVideo is found, display the video player and suggested videos
  // Render the video player and suggested videos
  return (
    <div className="mt-14 p-2 bg-neutral lg:flex">
      <div className="w-full lg:pr-6 lg:pt-6 lg:ml-6">
        <iframe
          className="w-full lg:w-[640px] xl:w-[800px] max-w-7xl h-50 md:h-[432px] lg:h-90 xl:h-[450px] max-h-[720px] rounded-2xl"
          src={`${currentVideo.src}?autoplay=1&mute=1`}
          title={currentVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <div className="py-4">
          {/* Title of the video */}
          <h2
            title={currentVideo.title}
            className="text-lg font-bold line-clamp-2"
          >
            {currentVideo.title}
          </h2>

          {/* Top row of video metadata */}

          <WatchMetaData currentVideo={currentVideo} />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:pr-6 lg:pt-6">
        {suggestedVideos.length > 0 &&
          suggestedVideos.map((vid) => <Card key={vid.videoId} video={vid} />)}
      </div>
    </div>
  );
};

export default WatchVideo;
