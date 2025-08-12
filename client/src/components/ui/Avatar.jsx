import { useState } from "react";

const Avatar = ({ avatar, name, styles }) => {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <>
      {avatar && !avatarError ? (
        <img
          className={`w-full h-full object-fit ${styles?.avatar}`}
          src={avatar}
          alt=""
          onError={() => setAvatarError(true)}
        />
      ) : (
        <h2 className={`text-2xl text-white ${styles?.text}`}>
          {name?.charAt(0).toUpperCase()}
        </h2>
      )}
    </>
  );
};

export default Avatar;
