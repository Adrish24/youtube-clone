import { memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import profileMenu from "../../../constants/profileMenu";
import { Icon } from "../../ui";

const ProfileButton = memo(() => {
  const userInfo = useSelector((state) => state.user.userInfo); // Check if the user is logged in
  const navigate = useNavigate();

  const toggleTheme = () => {
    console.log("Toggling theme"); // Debugging line to check theme toggle
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="py-2 ml-2">
      {userInfo ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn  btn-circle avatar btn-primary"
          >
            <h2 className="text-2xl">A</h2>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-0 py-2"
          >
            {profileMenu.map((item) => (
              <li key={item.name} title={item.name}>
                <Icon
                  path={item.name === "Home" ? "/" : "#"}
                  className="py-2 px-3 flex items-center text-sm hover:bg-base-300 rounded-none"
                >
                  <div>{item.svg}</div>
                  <p>{item.name}</p>
                  {item.name === "Appearance" ? (
                    <input
                      onChange={toggleTheme}
                      type="checkbox"
                      defaultChecked
                      className="toggle"
                    />
                  ) : null}
                </Icon>
              </li>
            ))}
          </ul>
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
