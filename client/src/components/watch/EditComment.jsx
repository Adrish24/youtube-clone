import { useState } from "react";
import { useSelector } from "react-redux";

import { Emojis } from "../features";

const EditComment = ({ setIsEdit, text }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const [isInputActive, setIsInputActive] = useState(false);
  const [showEomjiPicker, setShowEmojiPicker] = useState(false);
  const [editText, setEditText] = useState(text || "");

  // Handle form submission
  // This function will be called when the user submits the comment form
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  // Handle cancel button click
  // This will reset the form and hide the comment input
  const handleCancel = () => {
    console.log("Cancel clicked");
    setIsEdit(false);
    setEditText("");
  };

  // Handle emoji click
  const handleEmojiClick = (emoji) => {
    setEditText((prev) => prev + emoji);
  };

  return (
    <div className="flex">
      <div className="avatar mr-4">
        <div className="w-10 h-10 rounded-full">
          {!userInfo ? (
            <img src="https://yt3.ggpht.com/a/default-user=s48-c-k-c0x00ffffff-no-rj" />
          ) : (
            <div className="btn  btn-circle avatar btn-primary">
              <h2 className="text-2xl text-white">A</h2>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleFormSubmit} className="w-full mr-4">
        <div className="relative">
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onFocus={() => setIsInputActive(true)}
            onBlur={() => setIsInputActive(false)}
            autoComplete="off"
            className="w-full outline-none pb-1 border-b border-base-content/40"
            type="text"
            placeholder="Add a comment"
          />
          <div
            className={`
                  absolute bottom-0 left-1/2 h-0.5 bg-base-content
                  transform -translate-x-1/2 transition-all duration-200 ease-in-out
                  ${isInputActive ? "w-full " : "w-0"}
                `}
          />
        </div>

        <div className="flex items-center justify-between mt-2 relative">
          {/* Emoji picker button */}
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="btn btn-circle bg-base-100 hover:bg-base-content/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M15.83 15c-.52 1.38-2.19 2-3.79 2-1.59 0-3.28-.62-3.85-2h7.64m.69-1H7.49c-.27 0-.49.22-.46.47C7.34 16.83 9.7 18 12.05 18c2.35 0 4.69-1.18 4.93-3.54.03-.25-.2-.46-.46-.46zM12 3c4.96 0 9 4.04 9 9s-4.04 9-9 9-9-4.04-9-9 4.04-9 9-9m0-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.94 9.73C7.19 9.25 7.72 9 8.5 9c.75 0 1.28.25 1.57.75.14.24.45.32.68.18.24-.14.32-.44.18-.68C10.6 8.68 9.91 8 8.5 8c-1.48 0-2.15.69-2.44 1.27-.13.25-.03.55.21.67.07.04.15.06.23.06.18 0 .36-.1.44-.27zm7 0c.25-.48.78-.73 1.56-.73.75 0 1.28.25 1.57.75.14.24.45.32.68.18.24-.14.32-.44.18-.68C17.6 8.68 16.91 8 15.5 8c-1.48 0-2.15.69-2.44 1.27-.13.25-.03.55.21.67.07.04.15.06.23.06.18 0 .36-.1.44-.27z"></path>
            </svg>
          </button>

          {/* Emoji picker component */}
          {showEomjiPicker ? (
            <div className="absolute top-12 left-0">
              <Emojis onClick={handleEmojiClick} />
            </div>
          ) : null}

          {/* Cancel comment */}
          <div className="flex items-center-safe space-x-2">
            <button
              className="btn btn-ghost  hover:bg-base-content/20 rounded-full"
              onClick={handleCancel}
            >
              Cancel
            </button>

            {/* Submit comment */}
            <button
              type="submit"
              disabled={editText.trim() === "" ? true : false}
              className="btn bg-info hover:bg-info/90 rounded-full"
            >
              Edit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditComment;
