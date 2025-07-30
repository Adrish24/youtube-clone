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
import { useThemeContext } from "../../context/ThemeProvider";
import { useLocation } from "react-router-dom";

// Drawer component for the sidebar
// It uses a checkbox input to toggle the visibility of the sidebar

const Drawer = () => {
  const path = useLocation().pathname;
  const inputRef = useRef(null);

  const isUserLoggedIn = useSelector((state) => state.user.userInfo); // Check if the user is logged in

  const windowWidth = useResizeWindow(); // Custom hook to get the current window width

  const { isSidebarOpen } = useThemeContext();

  // Handle window resize to close the drawer on larger screens
  // This ensures that the drawer is closed when the screen width exceeds 1280px
  // This is useful for responsive design

  useEffect(() => {
    const checkbox = inputRef.current;
    const drawer = document.getElementById("drawer");
    if (checkbox) {
      if (windowWidth < 1280 || path === "/watch") {
        drawer.classList.remove("xl:drawer-open");
        return;
      }
      if (windowWidth >= 1280) {
        checkbox.checked = false;
        if (isSidebarOpen) drawer.classList.add("xl:drawer-open");
        return;
      }
    }
  }, [isSidebarOpen, path, windowWidth]);

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

        <div className="flex-nowrap bg-base-300 text-base-content h-screen  w-60  overflow-hidden">
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
          overflow-y-auto 
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
