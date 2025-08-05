import { useState } from "react";
import { Login, Signup } from "../components/auth";
import { Logo } from "../components/header/navigation";

const Auth = () => {
  const [authType, setAuthType] = useState("login"); // State to toggle between login and signup

  return (
    <div className="h-screen grid justify-center items-center bg-base-300">
      <div>
        <div className="flex justify-center fill-base-content">
          <Logo />
        </div>
        {authType === "login" ? <Login /> : <Signup />}  
        <div className="text-center mt-4">
          {authType === "login" ? (
            <p>
              Don't have an account?{" "}
              <a
                onClick={() => setAuthType("signup")}
                className="text-info cursor-pointer hover:underline"
              >
                Sign up
              </a>
            </p>
          ) : (
            <p>
              Already have an account ?{" "}
              <a
                onClick={() => setAuthType("login")}
                className="text-info cursor-pointer hover:underline"
              >
                Login
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
