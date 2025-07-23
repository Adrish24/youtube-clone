import { memo } from "react";

const BurgerMenu = memo(() => {
  const handleDrawerToggle = () => {
    const width = window.innerWidth;

    const drawer = document.getElementById("drawer");
    if (drawer && width < 1280) {
      const input = drawer.querySelector("input");
      input.checked = !input.checked;
      return;
    }

    if (drawer && width > 1280) {
      const sidebarMenu = document.getElementById("sidebar-menu");
      drawer.classList.toggle("xl:drawer-open");
      sidebarMenu.classList.toggle("xl:hidden");
      return;
    }
  };

  return (
    <button
      onClick={handleDrawerToggle}
      className="btn btn-circle mr-2 drawer-button"
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
