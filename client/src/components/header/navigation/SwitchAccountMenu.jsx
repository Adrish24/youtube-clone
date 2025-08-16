import { useDispatch } from "react-redux";
import { Avatar, ClickableItem } from "../../ui";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { setUserInfo } from "../../../context/redux/userSlice";
import { useActiveChannel } from "../../../hooks";

// This component renders the switch account menu with user information and options
// It allows users to switch between different accounts
const SwitchAccountMenu = ({
  closeSwitchAccount,
  handleMenuClick,
  handleNavigation,
}) => {
  const { activeChannel, userInfo } = useActiveChannel();

  const dispatch = useDispatch();

  const [isSwitchingChannel, setIsSwitchingChannel] = useState(false);

  // This function handles the switching of accounts
  // It updates the active channel for the user and dispatches the updated user info to the Redux store
  const handleSwitchAccount = async (e, userId, channelId) => {
    e.stopPropagation();
    e.preventDefault();
    setIsSwitchingChannel(true);
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    try {
      const res = await axios.post(`${apiUrl}/api/auth/switch-channel`, {
        userId,
        channelId,
      });

      dispatch(setUserInfo(res.data)); // Dispatch the user info to the Redux store

      localStorage.setItem("userInfo", JSON.stringify(res.data)); // Update local storage with new user info

      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSwitchingChannel(false);
    }
  };

  return (
    <ul className="absolute right-0 menu menu-sm  bg-base-100 rounded-box z-1 mt-3 w-60 p-0 py-2">
      {/* Overlay for switching channel */}
      {/* This is used to prevent clicks on the background while switching accounts */}
      {isSwitchingChannel ? (
        <div className="fixed bg-transparent top-0 left-0 right-0 bottom-0"></div>
      ) : null}

      {/* go back */}
      <div className="flex items-center px-3 space-x-2">
        <ClickableItem
          className="hover:bg-base-content/20"
          onClick={closeSwitchAccount}
        >
          <div className="p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M21 11v1H5.64l6.72 6.72-.71.71-7.93-7.93 7.92-7.92.71.71L5.64 11H21z"></path>
            </svg>
          </div>
        </ClickableItem>
        <p className="text-lg font-semibol">Accounts</p>
      </div>

      <hr className="border-base-content/20 my-2" />

      {/* User information */}
      <div className="px-3 flex flex-col">
        <h2>
          {activeChannel
            ? activeChannel.channelName
            : userInfo?.currentUser?.username}
        </h2>
        <p className="text-xs text-base-content/40 truncate w-46">
          {userInfo.currentUser.email}
        </p>
      </div>

      <hr className="border-base-content/20 mt-2" />

      {/* List of accounts */}
      {/* If the user has owned channels, display them */}
      {/* Otherwise, display the current user's information */}
      <div>
        {userInfo?.ownedChannels && userInfo?.ownedChannels.length > 0 ? (
          // Display owned channels
          userInfo?.ownedChannels.map((channel) => (
            <ClickableItem
              key={channel._id}
              onClick={(e) =>
                handleSwitchAccount(
                  e,
                  userInfo.currentUser.userId,
                  channel._id
                )
              }
              className="px-3 py-2 flex items-start hover:bg-base-content/10 rounded-none"
            >
              <div className="rounded-full mr-3 text-center">
                <Avatar avatar={channel.avatar} name={channel.channelName} />
              </div>
              <div className="flex flex-col w-full">
                <p className=" font-semibold truncate w-46">{channel.channelName}</p>
                <p className="text-xs text-base-content/40 truncate w-46">{channel.handle}</p>
              </div>
              {userInfo.currentUser.activeChannel === channel._Id ? (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    focusable="false"
                    aria-hidden="true"
                  >
                    <path d="m9 18.7-5.4-5.4.7-.7L9 17.3 20.6 5.6l.7.7L9 18.7z"></path>
                  </svg>
                </div>
              ) : null}
            </ClickableItem>
          ))
        ) : (
          // If no owned channels, display the current user's information
          <ClickableItem
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="px-3 py-2 flex items-start hover:bg-base-content/10 rounded-none"
          >
            <div className="bg-primary  rounded-full mr-3 text-center">
              <Avatar
                avatar={userInfo.currentUser?.avatar}
                name={userInfo.currentUser?.username}
                styles={{
                  textContainer: "",
                }}
              />
            </div>
            <div className="flex flex-col">
              <p className=" font-semibold">
                {userInfo?.currentUser?.username}
              </p>
              <p className="text-xs text-base-content/40 truncate w-46">
                {userInfo?.currentUser?.email}
              </p>
              <p className="text-xs text-base-content/40">No channels</p>
            </div>
          </ClickableItem>
        )}

        {/* If the user has channels, show the option to view all channels */}
        {/* Otherwise, show the option to create a new channel */}
        {userInfo?.currentUser?.channels?.length > 0 ? (
          <Link
            className="px-3 py-2 text-info hover:text-info/80"
            onClick={handleNavigation}
          >
            View All channels
          </Link>
        ) : (
          <Link
            onClick={(e) => handleMenuClick(e, "Create channel")}
            className="px-3 py-2 text-info hover:text-info/80"
          >
            Create your channel
          </Link>
        )}
      </div>

      <hr className="border-base-content/20 my-2" />

      {/* Add account */}
      <ClickableItem
        onClick={(e) => handleMenuClick(e, "Add account")}
        className="py-2 px-3 flex items-center space-x-1 text-sm hover:bg-base-content/20 rounded-none"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            focusable="false"
            aria-hidden="true"
          >
            <path d="M13.72 11.93A4.004 4.004 0 0017 8c0-2.21-1.79-4-4-4S9 5.79 9 8c0 1.96 1.42 3.59 3.28 3.93C6.77 12.21 4 15.76 4 20h18c0-4.24-2.77-7.79-8.28-8.07zM10 8c0-1.65 1.35-3 3-3s3 1.35 3 3-1.35 3-3 3-3-1.35-3-3zm3 4.9c5.33 0 7.56 2.99 7.94 6.1H5.06c.38-3.11 2.61-6.1 7.94-6.1zM4 12H2v-1h2V9h1v2h2v1H5v2H4v-2z"></path>
          </svg>
        </div>
        <p>Add account</p>
      </ClickableItem>

      {/* Sign out */}
      <ClickableItem
        onClick={(e) => handleMenuClick(e, "Sign out")}
        className="py-2 px-3 flex items-center space-x-1 text-sm hover:bg-base-content/20 rounded-none"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            focusable="false"
            aria-hidden="true"
          >
            <path d="M20 3v18H8v-1h11V4H8V3h12zm-8.9 12.1.7.7 4.4-4.4L11.8 7l-.7.7 3.1 3.1H3v1h11.3l-3.2 3.3z"></path>
          </svg>
        </div>
        <p>Sign out</p>
      </ClickableItem>
    </ul>
  );
};

export default SwitchAccountMenu;
