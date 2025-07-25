import { useEffect, useRef } from "react";
import {
  exploreMenu,
  mainMenu,
  miscellaneousMenu,
  youMenu,
} from "../../constants/sidebarMenu"; // Importing sidebar menu items
import { useSelector } from "react-redux";

import DrawerItem from "./DrawerItem";
import useResizeWindow from "../../hooks/useResizeWindow";
import { BurgerMenu, Logo } from "../header/navigation";

// Drawer component for the sidebar
// It uses a checkbox input to toggle the visibility of the sidebar

const Drawer = () => {
  const inputRef = useRef(null);

  const isUserLoggedIn = useSelector((state) => state.user.userInfo); // Check if the user is logged in

  const windowWidth = useResizeWindow(); // Custom hook to get the current window width

  // Handle window resize to close the drawer on larger screens
  // This ensures that the drawer is closed when the screen width exceeds 1280px
  // This is useful for responsive design

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      if (windowWidth > 1280) {
        input.checked = false;
      }
    }
  }, [windowWidth]);

  return (
    <div id="drawer" className="drawer">
      <input
        ref={inputRef}
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      <div className="drawer-side bg-base-100/50">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex-nowrap bg-base-300  text-base-content h-screen  w-60   overflow-hidden">
          {/* Sidebar Menu */}
          <div className="flex items-center pl-3 fill-base-content">
            {/* Burger Menu Icon */}
            {/* This is used for mobile view to toggle sidebar */}
            <BurgerMenu />

            {/* Youtube Logo  */}
            <Logo />
          </div>

          <div
            className="
          h-screen pb-20 pl-3
          overflow-y-auto  z-50
          scroll-smooth 
          [scrollbar-width:thin]"
          >
            <ul className="">
              {mainMenu.map((item) => (
                <DrawerItem key={item.name} item={item} />
              ))}

              <div className="divider my-0"></div>

              <h2 className="text-lg font-semibold pb-2">You</h2>

              {youMenu.map((item) =>
                isUserLoggedIn ? (
                  <DrawerItem key={item.name} item={item} />
                ) : item.name === "History" ? (
                  <DrawerItem key={item.name} item={item} />
                ) : null
              )}

              <div className="divider my-0"></div>

              <h2 className="text-lg font-semibold">Explore</h2>
              {exploreMenu.map((item) => (
                <DrawerItem key={item.name} item={item} />
              ))}

              <div className="divider my-0"></div>

              {miscellaneousMenu.map((item) => (
                <DrawerItem key={item.name} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
