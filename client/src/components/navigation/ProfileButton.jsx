import { memo } from "react";

const ProfileButton = memo(() => {
  return (
    <div className="py-2">
      <button className="btn btn-circle btn-primary">
        <h2 className="text-2xl">A</h2>
      </button>
    </div>
  );
});

export default ProfileButton;
