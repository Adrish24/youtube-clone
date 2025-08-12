import { useState } from "react";

const ChannelBanner = ({ channelBanner }) => {
  const [bannerError, setBannerError] = useState(false);

  return (
    <div className="px-4 sm:px-7 md:px-10 lg:px-10 xl:px-20 mx-auto w-full max-w-7xl">
      {bannerError ? null : (
        <img
          className="w-full object-cover rounded-2xl"
          src={channelBanner}
          alt=""
          onError={() => setBannerError(true)}
        />
      )}
    </div>
  );
};

export default ChannelBanner;
