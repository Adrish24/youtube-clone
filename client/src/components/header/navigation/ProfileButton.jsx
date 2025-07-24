import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../context/userSlice";

const ProfileButton = memo(() => {
  const isUserLoggedIn = useSelector((state) => state.user.userInfo); // Check if the user is logged in

  const dispatch = useDispatch();

  return (
    <div className="py-2 ml-2">
      {isUserLoggedIn ? (
        <button className="btn btn-circle btn-primary">
          <h2 className="text-2xl">A</h2>
        </button>
      ) : (
        <button
          onClick={() => dispatch(setUserInfo(true))}
          className="btn btn-outline btn-info rounded-full whitespace-nowrap"
        >
          Sign in
        </button>
      )}
    </div>
  );
});

export default ProfileButton;
