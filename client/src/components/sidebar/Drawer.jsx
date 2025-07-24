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
    <div id="drawer" className={`drawer top-14`}>
      <input
        ref={inputRef}
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      <div className="drawer-side bg-base-100/50 top-14  z-50">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div
          className="
        flex-nowrap 
        bg-base-300  
        text-base-content 
        max-h-screen 
        w-60  pb-20
        overflow-y-auto
        [scrollbar-width:thin]
        "
        >
          {/* Sidebar Menu */}

          <ul className="p-3">
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
  );
};

export default Drawer;
