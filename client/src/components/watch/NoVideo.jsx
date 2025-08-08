import { useNavigate } from "react-router-dom";

const NoVideo = () => {
  const navigate = useNavigate();
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
};

export default NoVideo;
