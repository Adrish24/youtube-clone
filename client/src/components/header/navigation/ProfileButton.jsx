import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Importing components for the profile menu
import ProfileMenuList from "./ProfileMenuList";
import SwitchAccountMenu from "./SwitchAccountMenu";

import { clearUserInfo } from "../../../context/redux/userSlice";

const ProfileButton = memo(() => {
  const userInfo = useSelector((state) => state.user.userInfo); // Check if the user is logged in

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSwitchAccount, setShowSwitchAccount] = useState(false);

  const profileButtonRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // This function navigates to the current user's channel
  const handleNavigation = (path) => {
    navigate(path);
    setShowProfileMenu(false);
    setShowSwitchAccount(false);
  };

  // This function handles the click on the profile menu items
  const handleMenuClick = (e, menuName) => {
    e.stopPropagation();
    console.log("Menu clicked:", menuName);
    switch (menuName) {
      case "Switch Account":
        setShowSwitchAccount(true);
        break;
      case "Sign out":
        console.log("Signing out...");
        dispatch(clearUserInfo());
        handleNavigation("/");
        break;
      case "Add account":
        navigate("/login");
        setShowProfileMenu(false);
        setShowSwitchAccount(false);
        break;
    }
  };

  // This function toggles the switch account menu
  const closeSwitchAccount = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSwitchAccount(false);
  };

  // This effect handles clicks outside the profile button to close the menu
  // It listens for clicks on the document and checks if the click is outside the profile button or menu
  // If it is, it closes the profile menu
  // This is useful for closing the menu when the user clicks outside of it
  // It also cleans up the event listener when the component unmounts
  useEffect(() => {
    const handleOutSideClick = (e) => {
      // Close the profile menu if clicked outside
      if (
        profileButtonRef.current &&
        !profileButtonRef.current.contains(e.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  }, []);

  return (
    <div className="py-2 ml-2">
      {userInfo ? (
        <div ref={profileButtonRef} className="relative">
          <div
            onClick={() => {
              setShowProfileMenu((prev) => !prev);
              setShowSwitchAccount(false);
            }}
            role="button"
            className="btn  btn-circle avatar btn-primary"
          >
            <h2 className="text-2xl text-white">A</h2>
          </div>

          {/* Profile Menu List */}
          {/* This menu appears when the user clicks on the profile button */}
          {/* It contains user information and various options */}
          {showProfileMenu && !showSwitchAccount ? (
            <ProfileMenuList
              handleMenuClick={handleMenuClick}
              handleNavigation={handleNavigation}
            />
          ) : null}

          {/* Switch Account Menu */}
          {/* This menu appears when the user clicks on "Switch Account" */}
          {showProfileMenu && showSwitchAccount ? (
            <SwitchAccountMenu
              closeSwitchAccount={closeSwitchAccount}
              handleMenuClick={handleMenuClick}
              handleNavigation={handleNavigation}
            />
          ) : null}
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="btn btn-outline btn-info rounded-full whitespace-nowrap"
        >
          Sign in
        </button>
      )}
    </div>
  );
});

export default ProfileButton;
