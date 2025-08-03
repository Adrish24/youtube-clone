import { memo, useEffect, useState } from "react";
import {
  BurgerMenu,
  Logo,
  ProfileButton,
  SearchToggle,
  SearchModal,
} from "./navigation";
import { SearchBar } from "../features";
import useResizeWindow from "../../hooks/useResizeWindow";

const Header = memo(() => {
  const [showSearchbar, setShowSearchBar] = useState(false);

  const windowWidth = useResizeWindow();

  useEffect(() => {
    if (windowWidth > 640) {
      setShowSearchBar(false); // Hide search bar when window width is greater than 640px
    }
  }, [windowWidth]);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "black" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <header
      className="
     fixed top-0 left-0 
     right-4 
     flex items-center justify-between 
     px-4 
     z-50 
     bg-base-300/85
     "
    >
      <div className="flex items-center">
        {/* Burger Menu Icon */}
        {/* This is used for mobile view to toggle sidebar */}
        <BurgerMenu />

        {/* Youtube Logo  */}
        <Logo />
      </div>

      {/* Search Button Icon */}
      {/* Show search bar modal for modile device */}
      <SearchToggle setShowSearchBar={setShowSearchBar} />
      {showSearchbar ? (
        <SearchModal setShowSearchBar={setShowSearchBar} />
      ) : null}

      {/* Search Bar for desktop view */}
      {/* This is not used for mobile view */}

      <SearchBar className="hidden sm:flex justify-center relative" />

      <nav className="flex items-center space-x-2">
        <input
          onChange={toggleTheme}
          type="checkbox"
          defaultChecked
          className="toggle"
        />
        {/* Profile Button Icon */}
        <ProfileButton />
      </nav>
    </header>
  );
});

export default Header;
