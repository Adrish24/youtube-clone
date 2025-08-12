import React from "react";

const NotFound = () => {
  return (
    <div className="flex-2 pt-14 bg-base-300 grid justify-center items-center min-h-screen">
      <div className="flex flex-col items-center text-center space-y-4">
        <img
          src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png"
          alt=""
        />
        <p>
          This page isn't available. Sorry about that.
          <br />
          Try searching for something else.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
