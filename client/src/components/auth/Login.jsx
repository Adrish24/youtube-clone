import { useState } from "react";
import { useForm } from "../../hooks";
import { InputField } from "../ui";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../context/redux/userSlice";

const Login = () => {
  const { formData, errors, handleInputChange, resetFrom } = useForm(
    { email: "", password: "" }, // Initial form data
    false // disable strict validation
  );

  const [showPassword, setShowpassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Alert state for feedback
  const [alert, setAlert] = useState({ success: null, message: "" }); // Alert state for feedback

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Toggle password visibility
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowpassword((prev) => !prev);
  };

  // Handle login form submission
  // This function will be called when the user submits the login form
  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setAlert({
        success: false,
        message: "Please fill in all required fields correctly.",
      });
      return;
    }

    console.log(formData);
    dispatch(setUserInfo(formData)); // Dispatch the user info to the Redux store
    navigate("/");

    resetFrom(); // Reset form after submission
  };

  return (
    <form onSubmit={handleLogin}>
      <fieldset className="fieldset bg-base-200 border-base-content/20 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-xl font-bold">Login</legend>

        {/* Error message */}
        {alert.message ? (
          <div
            role="alert"
            className={`alert ${
              alert.success ? "alert-success" : "alert-error"
            } alert-outline`}
          >
            <span>{alert.message}</span>
          </div>
        ) : null}

        {/* Email */}

        <InputField
          label={"Email"}
          id={"login-email"}
          type={"email"}
          placeholder={"Email"}
          title={"Please enter a valid email address"}
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        >
          {errors?.email ? (
            <p className="text-error mt-1">The field is required</p>
          ) : null}
        </InputField>

        {/* Password */}
        <InputField
          label={"Password"}
          id={"login-password"}
          type={`${showPassword ? "text" : "password"}`}
          placeholder={"Password"}
          title={"Please enter a valid password"}
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          styles={{
            container: "relative",
          }}
        >
          <button
            onClick={togglePasswordVisibility}
            className="absolute right-0 top-0 btn btn-xs btn-ghost"
          >
            {showPassword ? "hide" : "show"}
          </button>
          {errors?.password ? (
            <p className="text-error mt-1">The field is required</p>
          ) : null}
        </InputField>

        <button
          disabled={isLoggingIn}
          type="submit"
          className="btn bg-red-600 hover:bg-red-500 mt-4"
        >
          Login
        </button>
      </fieldset>
    </form>
  );
};

export default Login;
