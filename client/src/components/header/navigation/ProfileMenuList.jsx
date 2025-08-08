import { Link } from "react-router-dom";
import { profileMenu, ProfileMiscMenu } from "../../../constants/profileMenu";
import { ClickableItem } from "../../ui";
import { useSelector } from "react-redux";

// This component renders the profile menu list with user information and various options
// It includes a toggle for appearance settings and a switch account option
const ProfileMenuList = ({ handleMenuClick, handleNavigation }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const toggleTheme = () => {
    console.log("Toggling theme"); // Debugging line to check theme toggle
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ul className="absolute right-0 menu menu-sm  bg-base-100 rounded-box z-1 mt-3 w-60 p-0 py-2">
      {/* User informations */}
      <div className="px-3 py-2 flex items-start">
        <div className="bg-primary px-3 py-1 rounded-full mr-3">
          <h2 className="text-2xl text-white">A</h2>
        </div>
        <div className="flex flex-col">
          <p className=" font-semibold">Adrish Ghosh</p>
          <p className=" font-semibold">{userInfo.email}</p>
          {/* <Link
                    className="text-info"
                    onClick={navigateToCurrentUserChannel}
                  >
                    View your channel
                  </Link> */}
          <Link
            className="text-info hover:text-info/80"
            onClick={handleNavigation}
          >
            Create your channel
          </Link>
        </div>
      </div>

      <hr className="border-base-content/20 my-2" />

      {profileMenu.map((item) => (
        <li key={item.name} title={item.name}>
          <ClickableItem
            onClick={(e) => handleMenuClick(e, item.name)}
            className="py-2 px-3 flex items-center space-x-1 text-sm hover:bg-base-content/20 rounded-none"
          >
            <div>{item.svg}</div>
            <p>{item.name}</p>

            {/* If the item is "Appearance", add a toggle switch */}
            {item.name === "Appearance" ? (
              <input
                onChange={toggleTheme}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent click events
                }}
                type="checkbox"
                defaultChecked
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
