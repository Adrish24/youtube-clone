import { useCallback, useEffect, useRef, useState } from "react";
import useDebouncer from "./useDebouncer";
import axios from "axios";

// Custom hook to handle search functionality
// It fetches search results based on the debounced search term
// Returns search results, loading state, and error state
// Uses an AbortController to cancel previous requests if a new search is initiated
const useSearch = (searchTerm) => {
  const [searchList, setSearchList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const controllRef = useRef(null); // Reference to abort the request if needed

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"; // Default API URL

  const debouncedValue = useDebouncer(searchTerm); // Debounce the search term

  const handleSearch = useCallback(async () => {
    setIsSearching(true);
    setError(null);

    // Abort the previous request if it exists
    if (controllRef.current) {
      controllRef.current.abort();
    }

    // Create a new AbortController for the current request
    controllRef.current = new AbortController();

    try {
      const res = await axios.get(`${apiUrl}/api/search?q=${debouncedValue}`, {
        signal: controllRef.current.signal, // Signal to abort the request if needed
      });

      // Check if the response is successful
      setSearchList(res.data.results);
    } catch (error) {
      console.log(error.message);

      if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
        console.log("Request canceled");
      }

      setError("No results found.");
      setSearchList([]);
    } finally {
      setIsSearching(false);
    }
  }, [apiUrl, debouncedValue]);

  useEffect(() => {
    if (debouncedValue.trim() !== "") {
      handleSearch();
    }
  }, [debouncedValue, handleSearch]);

  return {
    searchList,
    isSearching,
    error,
  };
};

export default useSearch;
