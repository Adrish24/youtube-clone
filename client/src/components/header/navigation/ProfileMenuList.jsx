import { Link } from "react-router-dom";
import { profileMenu, ProfileMiscMenu } from "../../../constants/profileMenu";
import { Avatar, ClickableItem } from "../../ui";
import { useActiveChannel } from "../../../hooks";
import { useState } from "react";

// This component renders the profile menu list with user information and various options
// It includes a toggle for appearance settings and a switch account option
const ProfileMenuList = ({ handleMenuClick }) => {
  const { activeChannel, userInfo } = useActiveChannel();

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );

  // Function to toggle the theme between light and dark modes
  // It updates the document's data-theme attribute and saves the preference in localStorage
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Save the new theme to localStorage
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ul className="absolute right-0 menu menu-sm  bg-base-100 rounded-box z-1 mt-3 w-64 p-0 py-2 ">
      {/* User informations */}
      <div className="px-3 py-2 flex items-start w-full">
        <div className="flexw-10 h-10  rounded-full mr-3 text-center">
          {/* if user has active channel show the channels profile image. else show the actual user's profile image */}

          {activeChannel ? (
            <Avatar
              avatar={activeChannel.avatar}
              name={activeChannel.channelName}
            />
          ) : (
            <Avatar
              avatar={userInfo.currentUser?.avatar}
              name={userInfo.currentUser?.username}
            />
          )}
        </div>
        <div className="flex flex-col w-[80%]">
          <p className="font-semibold truncate w-46">
            {activeChannel
              ? activeChannel.channelName
              : userInfo?.currentUser?.username}
          </p>
          <p
            title={
              activeChannel
                ? activeChannel.handle
                : userInfo?.currentUser?.email
            }
            className="font-semibold truncate w-46"
          >
            {activeChannel
              ? activeChannel.handle
              : userInfo?.currentUser?.email}
          </p>

          {userInfo?.currentUser?.channels?.length > 0 ? (
            <Link
              className="text-info"
              onClick={(e) => handleMenuClick(e, "My channel")}
            >
              View your channel
            </Link>
          ) : (
            <Link
              onClick={(e) => handleMenuClick(e, "Create channel")}
              className="text-info hover:text-info/80"
            >
              Create your channel
            </Link>
          )}
        </div>
      </div>

      <hr className="border-base-content/20 my-2" />

      {profileMenu.map((item) => (
        <li key={item.name} title={item.name}>
          <ClickableItem
            onClick={(e) => {
              if (item.name === "Appearance") {
                toggleTheme();
                return;
              }
              handleMenuClick(e, item.name);
            }}
            className="py-2 px-3 flex items-center space-x-1 text-sm hover:bg-base-content/20 rounded-none"
          >
            <div>{item.svg}</div>
            <p>{item.name}</p>

            {/* If the item is "Appearance", add a toggle switch */}
            {item.name === "Appearance" ? (
              <input
                type="checkbox"
                checked={isDarkMode}
                readOnly
                className="toggle ml-auto"
              />
            ) : null}

            {/* If the item is "Switch Account", add an arrow icon */}
            {item.name === "Switch Account" ? (
              <div className="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path d="m9.4 18.4-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z"></path>
                </svg>
              </div>
            ) : null}
          </ClickableItem>
        </li>
      ))}

      <hr className="border-base-content/20 my-2" />

      {ProfileMiscMenu.map((item) => (
        <li
          onClick={(e) => handleMenuClick(e, item.name)}
          key={item.name}
          title={item.name}
        >
          <ClickableItem
            path={item.name === "Home" ? "/" : "#"}
            className="py-2 px-3 flex items-center space-x-1 text-sm hover:bg-base-content/20 rounded-none"
          >
            <div>{item.svg}</div>
            <p>{item.name}</p>
          </ClickableItem>
        </li>
      ))}
    </ul>
  );
};

export default ProfileMenuList;
