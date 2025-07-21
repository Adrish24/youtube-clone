import { useState } from "react";
import {
  BurgerMenu,
  Logo,
  ProfileButton,
  SearchButton,
  SearchModal,
} from "./navigation";
import { SearchBar } from "./features";

const Header = () => {
  const [showSearchbar, setShowSearchBar] = useState(false);

  console.log(window.innerWidth);

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between fill-base-content px-2 z-50 bg-base-300">
      <div className="flex items-center">
        {/* Burger Menu Icon */}
        {/* This is used for mobile view to toggle sidebar */}
        <BurgerMenu />

        {/* Youtube Logo  */}
        <Logo />
      </div>

      {/* Search Button Icon */}
      {/* Show search bar modal for modile device */}
      <SearchButton setShowSearchBar={setShowSearchBar} />
      {showSearchbar ? (
        <SearchModal setShowSearchBar={setShowSearchBar} />
      ) : null}

      {/* Search Bar for desktop view */}
      {/* This is not used for mobile view */}
      <div className="hidden sm:flex justify-center w-full">
        <SearchBar />
      </div>

      {/* Profile Button Icon */}
      <ProfileButton />
    </header>
  );
};

export default Header;
