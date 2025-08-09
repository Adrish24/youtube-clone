import { useEffect, useRef, useState } from "react";
import SearchItem from "./SearchItem";

import { RxCross1 } from "react-icons/rx";
import { useSearch } from "../../hooks";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ className }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const inputRef = useRef(null);

  // Function to handle clicks outside the search input
  // This function sets the focus state to false when a click occurs outside the input
  // It uses a ref to check if the click target is outside the input element
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  // Function to handle focus on the search input
  // This function retrieves the search history from localStorage and sets it in the state
  // It also sets the focus state to true
  const handleFocus = () => {
    setSearchHistory(
      JSON.parse(localStorage.getItem("search_query_history")) || []
    );
    setIsFocused(true);
  };

  // Using the useSearch hook to handle search logic
  const { searchList, error } = useSearch(inputValue);

  // Function to clear the input field and focus on it
  // This function is called when the clear button is clicked
  const handleClearInput = (e) => {
    e.preventDefault();

    setInputValue("");
    setTimeout(() => {
      inputRef.current?.focus();
      setIsFocused(true);
    }, 300);
  };

  // Function to encode the search query
  const encodeQuery = (query) => {
    return encodeURIComponent(query.trim()).replace(/%20/g, "+");
  };

  // Function to handle form submission with a search query
  const handleSeachQuerySubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target.querySelector("input").value);

    const trimedValue = inputValue.trim();

    if (trimedValue === "") return;
    navigateToSearch(trimedValue);
  };

  // Function to handle form submission with a query
  const handleSubmitFromSearchList = (e, query) => {
    e.preventDefault();
    e.stopPropagation();

    navigateToSearch(query);
  };

  // Function to navigate to the search results page with the given query
  // This function updates the search history in localStorage if the query is not already present
  const navigateToSearch = (query) => {
    navigate(`/results?search_query=${encodeQuery(query)}`);
    setIsFocused(false);
    setInputValue(query);
    setTimeout(() => inputRef.current?.blur(), 0);

    // Check if the query is already in the search history
    if (searchHistory.includes(query.trim())) return;
    localStorage.setItem(
      "search_query_history",
      JSON.stringify([...searchHistory, query.trim()])
    ); // Update the search history in localStorage
  };

  return (
    <div className={className}>
      {/* Search field */}
      <form
        onSubmit={handleSeachQuerySubmit}
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
          onFocus={handleFocus}
          // onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          className=" border-none outline-none py-2 px-4 w-full "
          type="text"
          placeholder="Search"
        />
        <button
          type="submit"
          className="py-2 pr-4 pl-6 bg-base-100 border-l-1 border-l-base-content/20 cursor-pointer"
        >
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
      </form>

      {/* Search result list */}
      {isFocused ? (
        <ul
          className="p-0
        menu bg-base-200 
        rounded-box w-full 
        sm:w-sm md:w-md 
        lg:w-lg 
        absolute 
        top-12
        left-0 z-[200px] overflow-hidden
        "
        >
          {!inputValue
            ? searchHistory.length > 0
              ? searchHistory.map((item, i) => (
                  <SearchItem
                    key={i}
                    item={item}
                    submit={handleSubmitFromSearchList}
                    isHistory={true}
                  />
                ))
              : null
            : searchList && searchList.length > 0
            ? searchList.map((item, i) => (
                <SearchItem
                  key={i}
                  item={item.title}
                  submit={handleSubmitFromSearchList}
                />
              ))
            : error}
        </ul>
      ) : null}
    </div>
  );
};

export default SearchBar;
