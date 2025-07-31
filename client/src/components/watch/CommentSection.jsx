import { useState } from "react";
import { useSelector } from "react-redux";

const CommentSection = ({ currentVideo }) => {
  const isUserLoggedIn = useSelector((state) => state.user.userInfo); // Check if the user is logged in
  const [inputActive, setInputActive] = useState(false);
  return (
    <div>
      <div className="mt-6 mb-8 flex flex-col  space-y-3 justify-center">
        <div className="flex space-x-6">
          <h2 className="text-xl font-bold">
            {currentVideo.comments.length} Comments
          </h2>
          <button
            title="sort comments"
            className="btn btn-sm btn-ghost fill-base-content"
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
              <path d="M21 6H3V5h18v1zm-6 5H3v1h12v-1zm-6 6H3v1h6v-1z"></path>
            </svg>
            <span>Sort by</span>
          </button>
        </div>
        <div className="flex">
          <div className="avatar mr-4">
            <div className="w-10 h-10 rounded-full">
              {!isUserLoggedIn ? (
                <img src="https://yt3.ggpht.com/a/default-user=s48-c-k-c0x00ffffff-no-rj" />
              ) : null}
            </div>
          </div>
          <div className="w-full mr-4">
            <input
              className="w-full border-b border-base-content/30 pb-1"
              type="text"
              placeholder="Add a comment"
            />
          </div>
        </div>
      </div>
      <div>comments</div>
    </div>
  );
};

export default CommentSection;
