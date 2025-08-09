import { useState } from "react";
import { useSelector } from "react-redux";
import EditComment from "./EditComment";

const CommentItem = ({ comment }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const [isEdit, setIsEdit] = useState(false);

  // const handleDeleteComment = () => {};

  // Format the upload date to a more readable format
  const commentDate = new Date(comment.timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (isEdit) return <EditComment setIsEdit={setIsEdit} text={comment.text} />;

  return (
    <div className="flex text-sm">
      <div className="avatar mr-4">
        <div className="w-10 h-10 rounded-full">
          <img src="https://yt3.ggpht.com/a/default-user=s48-c-k-c0x00ffffff-no-rj" />
        </div>
      </div>
      <div className="w-full">
        <h2 className="flex items-center space-x-1">
          <span className="font-bold cursor-pointer"> @{comment.userId}</span>
          <span className="text-base-content/40 font-thin text-xs">
            {commentDate}
          </span>
        </h2>
        <p>{comment.text}</p>

        {/* like, dislike buttons with counts & reply button */}
        <div className="flex items-center space-x-2 mt-2">
          <button
            title="like"
            className="btn btn-ghost btn-circle hover:bg-base-content/20"
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
              <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h14.43c1.06 0 1.98-.67 2.19-1.61l1.34-6c.27-1.24-.78-2.39-2.19-2.39zM7 20H4v-8h3v8zm12.98-6.83-1.34 6c-.1.48-.61.83-1.21.83H8v-8.61l5.6-6.06c.19-.21.48-.33.78-.33.26 0 .5.11.63.3.07.1.15.26.09.47l-1.52 4.94-.4 1.29h5.58c.41 0 .8.17 1.03.46.13.15.26.4.19.71z"></path>
            </svg>
          </button>
          <div>10</div>
          <button
            title="dislike"
            className="btn btn-ghost btn-circle hover:bg-base-content/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M17 4H6.57c-1.07 0-1.98.67-2.19 1.61l-1.34 6C2.77 12.85 3.82 14 5.23 14h4.23l-1.52 4.94C7.62 19.97 8.46 21 9.62 21c.58 0 1.14-.24 1.52-.65L17 14h4V4h-4zm-6.6 15.67c-.19.21-.48.33-.78.33-.26 0-.5-.11-.63-.3-.07-.1-.15-.26-.09-.47l1.52-4.94.4-1.29H5.23c-.41 0-.8-.17-1.03-.46-.12-.15-.25-.4-.18-.72l1.34-6c.1-.47.61-.82 1.21-.82H16v8.61l-5.6 6.06zM20 13h-3V5h3v8z"></path>
            </svg>
          </button>
          <div>2</div>
          <button
            title="reply"
            className="btn btn-ghost hover:bg-base-content/20 rounded-full"
          >
            Reply
          </button>
        </div>
      </div>

      {/* options button for the comment */}
      <div className="dropdown dropdown-end">
        <button
          tabIndex={0}
          role="button"
          className="btn btn-sm btn-ghost btn-circle"
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
            <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
          </svg>
        </button>

        {userInfo && userInfo.emil ? (
          <div
            tabIndex={0}
            className="dropdown-content menu bg-base-100 shadow-lg rounded-xl w-40 py-2 px-0 z-50"
          >
            <button
              onClick={() => setIsEdit(true)}
              className="block px-4 py-2 text-sm hover:bg-base-content/20 w-full text-left cursor-pointer"
            >
              Edit
            </button>

            <button className="block px-4 py-2 text-sm hover:bg-base-content/20 w-full text-left cursor-pointer">
              Delete
            </button>
          </div>
        ) : (
          <div
            tabIndex={0}
            className="dropdown-content menu bg-base-100 shadow-lg rounded-xl w-40 py-2 px-0 z-50"
          >
            <button
              onClick={() => setIsEdit(true)}
              className="block px-4 py-2 text-sm hover:bg-base-content/20 w-full text-left cursor-pointer"
            >
              Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
