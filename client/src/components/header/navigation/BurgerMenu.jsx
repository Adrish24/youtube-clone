import { memo } from "react";
import { useLocation } from "react-router-dom";
import { useThemeContext } from "../../../context/ThemeProvider";

const BurgerMenu = memo(() => {
  const path = useLocation().pathname; // Get the current path to conditionally render drawer

  const { setIsSidebarOpen } = useThemeContext(); // Use the theme context to access theme-related values

  // Function to handle the drawer toggle
  // It checks the screen width and toggles the drawer accordingly
  // If the screen width is less than 1280px, it toggles the drawer
  // If the path is "/watch", it also toggles the drawer
  // If the screen width is greater than or equal to 1280px, it toggles the sidebar menu visibility
  // This is useful for responsive design
  const handleDrawerToggle = () => {
    const width = window.innerWidth;

    const drawer = document.getElementById("drawer");
    if ((drawer && width < 1280) || path === "/watch") {
      const checkbox = drawer.querySelector("input");
      checkbox.checked = !checkbox.checked;
      return;
    }

    if (drawer && width >= 1280) {
      setIsSidebarOpen((prev) => !prev);
      const homePage = document.getElementById("home");
      homePage.classList.toggle("xl:ml-60");
      const categories = document.getElementById("categories");
      categories.classList.toggle("xl:left-60");
      const sidebarMenu = document.getElementById("sidebar-menu");
      sidebarMenu.classList.toggle("xl:hidden");
      drawer.classList.toggle("xl:drawer-open");
      return;
    }
  };

  return (
    <button
      onClick={handleDrawerToggle}
      className="btn btn-circle mr-2 drawer-button p-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        aria-hidden="true"
      >
        <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
      </svg>
    </button>
  );
});

export default BurgerMenu;
