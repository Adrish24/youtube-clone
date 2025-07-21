const SearchBar = () => {
  return (
    <div
      className="
    flex 
    border-1 border-base-content/20 
    rounded-full sm:w-sm md:w-md lg:w-lg
    overflow-hidden 
    bg-base-200/40
    "
    >
      <input
        className=" border-none outline-none py-2 px-4 w-full"
        type="text"
        placeholder="Search"
      />
      <div className="py-2 pr-2 pl-4 bg-base-100 border-l-1 border-l-base-content/20">
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
      </div>
    </div>
  );
};

export default SearchBar;
