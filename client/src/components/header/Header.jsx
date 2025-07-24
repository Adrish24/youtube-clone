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

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between fill-base-content px-3 z-50 bg-base-300">
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

      {/* Profile Button Icon */}
      <ProfileButton />
    </header>
  );
});

export default Header;
