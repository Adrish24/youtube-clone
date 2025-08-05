import { InputField } from "../ui";
import { useForm } from "../../hooks";
import { validateForm } from "../../utils";
import { useState } from "react";

const Signup = () => {
  const { formData, errors, handleInputChange, resetFrom } = useForm(
    { username: "", email: "", password: "" } // Initial form data
  );

  const [showPassword, setShowpassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const [alert, setAlert] = useState({ success: null, message: "" }); // Alert state for feedback

  // Toggle password visibility
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowpassword((prev) => !prev);
  };

  // Handle signup form submission
  // This function will be called when the user submits the signup form
  const handleSignup = (e) => {
    e.preventDefault();
    if (!validateForm(formData, ["username", "email", "password"])) {
      setAlert({
        success: false,
        message: "Please fill in all required fields correctly.",
      });
      return;
    }

    console.log(formData);
    resetFrom(); // Reset form after submission
    setAlert({
      success: true,
      message: "Signup successful!",
    });
  };

  return (
    <form onSubmit={handleSignup}>
      <fieldset className="fieldset bg-base-200 border-base-content/20 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-xl font-bold">Sign up</legend>

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

        {/* Username */}
        <InputField
          label={"Username"}
          id={"signup-username"}
          type={"text"}
          placeholder={"Username"}
          title={
            "Must be 6 to 30 characters, containing only letters, numbers or dash"
          }
          minLength={6}
          maxLength={30}
          value={formData.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
        >
          {errors?.username ? (
            <p className="text-error mt-1">
              Must be 6 to 30 characters
              <br />
              containing only letters, numbers or dash
            </p>
          ) : null}
        </InputField>

        {/* Email */}
        <InputField
          label={"Email"}
          id={"signup-email"}
          type={"email"}
          placeholder={"Email"}
          title={"Please enter a valid email address"}
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        >
          {errors?.email ? (
            <p className="text-error mt-1">Enter valid email address</p>
          ) : null}
        </InputField>

        {/* Password */}
        <InputField
          label={"Password"}
          id={"signup-password"}
          type={`${showPassword ? "text" : "password"}`}
          placeholder={"Password"}
          title={
            "Password must be at least 6 characters long and contain at least one letter and one number"
          }
          minLength={6}
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          styles={{
            container: "relative",
          }}
        >
          <button
            onClick={togglePasswordVisibility}
            className="absolute right-0 top-0 btn btn-xs btn-ghost outline-none border-none"
          >
            {showPassword ? "hide" : "show"}
          </button>

          {errors?.password ? (
            <p className="text-error mt-1">
              Must be more than 6 characters, including
              <br />
              At least one number
              <br />
              At least one lowercase letter
              <br />
              At least one uppercase letter
              <br />
              No special characters
            </p>
          ) : null}
        </InputField>

        <button
          disabled={isSigningUp}
          type="submit"
          className="btn bg-red-600 hover:bg-red-500 mt-4"
        >
          Sign up
        </button>
      </fieldset>
    </form>
  );
};

export default Signup;
