import { useState } from "react";
import { useCreateChannel } from "../../hooks";
import { validateForm } from "../../utils";

import { InputField } from "../ui";

const CreateChannel = ({ cancel }) => {
  const { formData, invalidHandle, setInvalidHandle, handleInputChange } =
    useCreateChannel({
      name: "",
      handle: "",
    });

  const [isCreating, setIsCreating] = useState(false);

  const [alert, setAlert] = useState({ success: null, message: "" }); // Alert state for feedback

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    if (!validateForm(formData, ["name", "handle"])) {
      setInvalidHandle(true);
    } else {
      setInvalidHandle(false);
    }
  };

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 bg-base-300/60 z-[101] grid justify-center items-center">
      <div className="bg-base-100 py-4 px-5 rounded-2xl">
        <h2 className="text-2xl font-bold mb-10">How You will appear</h2>
        <form
          onSubmit={handleCreateChannel}
          className="flex flex-col space-y-4 w-60 sm:w-sm md:w-md lg:w-lg  max-w-xl "
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
                cancel(false);
              }}
              className="btn btn-ghost rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={invalidHandle}
              className="btn btn-ghost rounded-full btn-info"
            >
              Create channle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannel;
