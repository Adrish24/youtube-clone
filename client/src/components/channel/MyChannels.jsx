import { useState } from "react";
import { useActiveChannel } from "../../hooks";
import { Avatar, ClickableItem } from "../ui";

import { IoMdAdd } from "react-icons/io";
import CreateChannel from "./CreateChannel";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../context/redux/userSlice";

const MyChannels = ({ close }) => {
  const { activeChannel, userInfo } = useActiveChannel();

  const [showCreateChannel, setShowCreateChannel] = useState(false);

  const [isSwitchingChannel, setIsSwitchingChannel] = useState(false);

  const dispatch = useDispatch();

  // This function handles the switching of accounts
  // It updates the active channel for the user and dispatches the updated user info to the Redux store
  const handleSwitchAccount = async (e, channelId) => {
    e.stopPropagation();
    e.preventDefault();
    setIsSwitchingChannel(true);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${apiUrl}/api/auth/switch-channel`,
        {
          channelId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    <div className="fixed left-0 top-0 right-0 bottom-0 bg-base-300/60 z-[101] grid justify-center items-center">
      {/* Overlay for switching channel */}
      {/* This is used to prevent clicks on the background while switching accounts */}
      {isSwitchingChannel ? (
        <div className="fixed bg-transparent top-0 left-0 right-0 bottom-0"></div>
      ) : null}

      <div className="bg-base-100 py-4 px-5 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <button
            onClick={() => setShowCreateChannel(true)}
            className="btn bg-base-content/20 hover:bg-base-content/10 rounded-md "
          >
            <IoMdAdd className="text-2xl" /> Create Channel
          </button>
          {userInfo?.ownedChannels && userInfo?.ownedChannels.length > 0
            ? // Display owned channels
              userInfo?.ownedChannels.map((channel) => (
                <ClickableItem
                  key={channel._id}
                  onClick={(e) => handleSwitchAccount(e, channel._id)}
                  className="px-3 py-2 flex items-start hover:bg-base-content/10"
                >
                  <div className="rounded-full mr-3 text-center">
                    <Avatar
                      avatar={channel.avatar}
                      name={channel.channelName}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className=" font-semibold truncate w-40">
                      {channel.channelName}
                    </p>
                    <p className="text-xs text-base-content/40 truncate w-40">
                      {channel.handle}
                    </p>
                  </div>
                  {activeChannel?._id === channel._id ? (
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
            : null}
        </div>

        <div className="flex justify-end">
          <button onClick={close} className="btn btn-ghost rounded-full">
            Close
          </button>
        </div>
      </div>
      {showCreateChannel ? (
        <CreateChannel close={() => setShowCreateChannel(false)} />
      ) : null}
    </div>
  );
};

export default MyChannels;
