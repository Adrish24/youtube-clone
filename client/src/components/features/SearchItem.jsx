import { useState } from "react";
import { MdHistory, MdClose, MdSearch } from "react-icons/md";

const SearchItem = ({ item, submit, isHistory = false }) => {
  const [deleted, setDeleted] = useState(false);

  // Function to handle the click event on the search item
  // This function calls the submit function passed as a prop with the item
  // It also prevents the click event from bubbling up
  const deleteHistoryItem = (e, item) => {
    e.stopPropagation();
    const searchHistory = JSON.parse(
      localStorage.getItem("search_query_history")
    );
    const updatedHistory = searchHistory.filter(
      (historyItem) => historyItem !== item
    );
    localStorage.setItem(
      "search_query_history",
      JSON.stringify(updatedHistory)
    );
    setDeleted(true);
  };

  return (
    <li>
      {isHistory ? (
        deleted ? (
          <p className="text-base-content/40 cursor-default">
            Suggestion removed
          </p>
        ) : (
          <div
            onClick={(e) => submit(e, item)}
            className="flex items-center cursor-default"
          >
            <div>
              <MdHistory size={20} />
            </div>
            <p className="w-full line-clamp-2 font-semibold">
              {item.split(" ").slice(0, 5).join(" ")}
            </p>
            <button
              onClick={(e) => deleteHistoryItem(e, item)}
              className="cursor-pointer px-2"
            >
              <MdClose size={20} />
            </button>
          </div>
        )
      ) : (
        <div
          onClick={(e) => submit(e, item)}
          className="flex items-center cursor-default"
        >
          <div>
            <MdSearch size={20} />
          </div>
          <p className="w-full line-clamp-2 font-semibold">
            {item.split(" ").slice(0, 5).join(" ")}
          </p>
        </div>
      )}
    </li>
  );
};

export default SearchItem;
