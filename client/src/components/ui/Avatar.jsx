import { useState } from "react";

const Avatar = ({ avatar, name, styles }) => {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <>
      {avatar && !avatarError ? (
        <img
          className={`w-full h-full object-fit rounded-full ${styles?.avatar}`}
          src={avatar}
          alt=""
          onError={() => setAvatarError(true)}
        />
      ) : (
        <div className="w-full h-full py-1 px-3 flex items-center justify-center bg-primary rounded-full">
          <h2 className={`text-2xl text-white ${styles?.text}`}>
            {name?.charAt(0).toUpperCase()}
          </h2>
        </div>
      )}
    </>
  );
};

export default Avatar;
