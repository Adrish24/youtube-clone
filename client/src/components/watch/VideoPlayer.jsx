const VideoPlayer = ({ src, title }) => {
  return (
    <iframe
      id="video-player"
      loading="lazy"
      className="
            w-full  lg:w-[640px] xl:w-[800px] 2xl:w-[1062px]
            h-60 sm:h-90 md:h-[432px] lg:h-90 xl:h-[450px] 2xl:h-[597px] 
            rounded-2xl
            "
      src={`${src}?autoplay=1&mute=1`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};

export default VideoPlayer;
