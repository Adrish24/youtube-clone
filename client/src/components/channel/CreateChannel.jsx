import { useState } from "react";
import { useCreateChannel } from "../../hooks";
import { validateForm } from "../../utils";

import { InputField } from "../ui";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../context/redux/userSlice";

const CreateChannel = ({ close }) => {
  // Custom hook to manage form data and validation
  // It initializes form data and provides a function to handle input changes
  const { formData, invalidHandle, handleInputChange } = useCreateChannel({
    name: "",
    handle: "",
  });

  const [isCreating, setIsCreating] = useState(false);
  const [alert, setAlert] = useState({ success: null, message: "" });

  const dispatch = useDispatch();

  // Function to handle channel creation
  // It validates the form data and sends a POST request to create a new channel
  // If successful, it updates the user info in the Redux store and local storage
  // If there's an error, it sets an alert message
  const handleCreateChannel = async (e) => {
    e.preventDefault();

    setIsCreating(true);
    if (!validateForm(formData, ["name", "handle"])) {
      setAlert({
        success: false,
        message: "Please fill all required fields correctly.",
      });
      return;
    }

    // API URL and token for authentication
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const token = localStorage.getItem("token");

    try {
      // Sending a POST request to create a new channel
      // The request includes the form data and the authorization token in the headers
      const res = await axios.post(
        `${apiUrl}/api/channel/create`,
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setUserInfo(res.data));
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      close();
    } catch (error) {
      console.log(error);
      setAlert({ success: false, message: error.response?.data?.message });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 bg-base-300/60 z-[101] grid justify-center items-center">
      <div className="bg-base-100 py-4 px-5 rounded-2xl">
        <h2 className="text-2xl font-bold mb-10">How You will appear</h2>

        {/* Error message */}
        {alert.message ? (
          <div
            role="alert"
            className={`alert ${
              alert.success ? "alert-success" : "alert-error"
            } alert-outline mb-4`}
          >
            <span>{alert.message}</span>
          </div>
        ) : null}

        {/* Form for creating a channel */}
        <form
          onSubmit={handleCreateChannel}
          className="flex flex-col space-y-4 w-full sm:w-sm md:w-md lg:w-lg  max-w-xl "
        >
          <div className="flex flex-col items-center space-y-2">
            <img
              id="img"
              draggable="false"
              className="rounded-full"
              alt=""
              height="128"
              width="128"
              src="https://yt3.ggpht.com/a/default-user=s200-c-k-c0x00ffffff-no-rj"
            ></img>
            <button className="text-info">Select picture</button>
          </div>

          <InputField
            id={"name"}
            label={"Name"}
            type={"text"}
            placeholder={"Name"}
            title={"Enter your channel name"}
            styles={{
              label: "text-sm mb-1",
              input: "w-full",
            }}
            value={formData?.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />

          <InputField
            id={"handle"}
            label={"Handle"}
            type={"text"}
            placeholder={"Handle"}
            styles={{
              label: "text-sm mb-1",
              input: "w-full relative",
            }}
            title={"Must be 3 or more characters, no spaces, starting with @"}
            value={formData?.handle}
            onChange={(e) => handleInputChange("handle", e.target.value)}
            autocomplete={"off"}
          >
            {invalidHandle ? (
              <p className="mt-1 text-xs">
                Must be 3 or more characters
                <br />
                No spaces
                <br />
              </p>
            ) : null}
          </InputField>

          <div className="flex justify-end space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                close();
              }}
              disabled={isCreating}
              className="btn btn-ghost rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={invalidHandle | isCreating}
              className="btn btn-ghost rounded-full btn-info"
            >
              {isCreating ? "Creating..." : "Create channel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannel;
