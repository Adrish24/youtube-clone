import { useRef, useState } from "react";
import SearchHistory from "../../../public/dummySearchHistory";
import SearchItem from "./SearchItem";

import { RxCross1 } from "react-icons/rx";

const SearchBar = ({ className }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);

  const handleClearInput = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up
    setInputValue("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div className={className}>
      {/* Search field */}
      <div
        className="
        flex 
        border-1 border-base-content/20 
        rounded-full w-full sm:w-sm md:w-md lg:w-lg xl:w-xl
        overflow-hidden 
        bg-base-200/40 relative
        "
      >
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className=" border-none outline-none py-2 px-4 w-full "
          type="text"
          placeholder="Search"
        />
        <button className="py-2 pr-4 pl-6 bg-base-100 border-l-1 border-l-base-content/20 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            focusable="false"
            aria-hidden="true"
          >
            <path
              clip-rule="evenodd"
              d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </button>
        {inputValue !== "" ? (
          <button
            onClick={handleClearInput}
            className="absolute right-18 top-1 hover:bg-gray-700 p-1 rounded-full cursor-pointer"
          >
            <RxCross1 size={24} />
          </button>
        ) : null}
      </div>

      {/* Search result list */}
      {isFocused ? (
        <ul
          className="
        menu bg-base-200 
        rounded-box w-full 
        sm:w-sm md:w-md 
        lg:w-lg 
        absolute 
        top-12
        left-0
        "
        >
          {SearchHistory.map((item) => (
            <SearchItem key={item} item={item} />
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default SearchBar;
