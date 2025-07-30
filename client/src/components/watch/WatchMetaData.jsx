import { BiDislike, BiLike } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const WatchMetaData = ({ currentVideo }) => {
  const navigate = useNavigate();

  // Format view count and upload date for better readability
  const viewCount = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(currentVideo.views);

  const likes = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(currentVideo.likes);

  const dislikes = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(currentVideo.dislikes);

  // Format the upload date to a more readable format
  const uploadDate = new Date(currentVideo.uploadDate).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  const handleNavigateToChannel = (e) => {
    e.stopPropagation(); // Prevent the card click event
    const channleName = currentVideo.uploader.replace(/\s+/g, "").toLowerCase();
    navigate(`/@${channleName}`);
  };
  return (
    <div className="flex flex-wrap lg:flex-nowrap">
      {/* This element contains channel information  */}
      {/* channel name, image, subscribers count, join & subscribe button */}
      <div className="grow flex items-center-safe  mt-3 mr-3">
        <div className="flex items-center">
          <div className="w-10 h-10 mr-3">
            <img
              src={currentVideo.profile}
              alt=""
              className="bg-gray-300 h-9 w-full rounded-full object-fit"
            />
          </div>
          <div className="flex flex-col mr-6 ">
            <p onClick={handleNavigateToChannel} className="font-bold truncate lg:w-16 xl:w-full">
              {currentVideo.uploader}
            </p>
            <p className="text-sm text-base-content/60 truncate lg:w-16 xl:w-full">
              1k subscribers
            </p>
          </div>
          <button
            title="Join Channel"
            className="btn bg-base-300 hover:bg-base-100 rounded-3xl mr-2"
          >
            Join
          </button>
        </div>
        <button
          title="Subscribe to Channel"
          className="btn bg-base-content hover:bg-base-content/90 text-neutral rounded-3xl"
        >
          Subscribe
        </button>
      </div>

      {/* This element contains information about the video */}
      {/* Like,Dislike buttons & with counts, Share,Dowload, feedback buttons*/}
      <div className="grow flex items-center  p-1 -m-1 space-x-2 relative top-1">
        {/* Like and Dislike buttons with counts */}
        <div className="flex items-center-safe">
          <button
            title="i like this"
            className="py-2 px-3 text-sm cursor-pointer flex items-center bg-base-100 hover:bg-base-content/20  rounded-s-full relative font-semibold"
          >
            <BiLike className="text-xl mr-1" />
            {likes}
            {/* divide between like and dislike button */}
            <div className="absolute top-0 text-xl font-thin -right-[2px] cursor-pointer">
              |
            </div>
          </button>
          <button
            title="i dislike this"
            className="py-2 px-3 text-sm cursor-pointer flex items-center bg-base-100 hover:bg-base-content/20 rounded-e-full font-semibold"
          >
            <BiDislike className="text-xl mr-1" />
            {dislikes}
          </button>
        </div>

        {/* Share button */}
        <button
          title="Share this video"
          className="py-2 px-3 text-sm font-semibold cursor-pointer flex items-center bg-base-100 hover:bg-base-content/20  rounded-full"
        >
          <div className=" fill-base-content mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z"></path>
            </svg>
          </div>
          Share
        </button>

        {/* Download button */}
        <button
          title="Download Video"
          className="py-2 px-3 text-sm font-semibold cursor-pointer flex items-center bg-base-100 hover:bg-base-content/20  rounded-full lg:hidden"
        >
          <div className=" fill-base-content mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"></path>
            </svg>
          </div>
          Download
        </button>

        {/* Feedback button */}
        <button className="p-2  text-sm font-semibold cursor-pointer flex items-center bg-base-100 hover:bg-base-content/20  rounded-full">
          <div className=" fill-base-content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M7.5 12c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm4.5-1.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm6 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default WatchMetaData;
