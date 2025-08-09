import { useEffect, useState } from "react";

//  Custom hook to debounce input values
//  This hook delays the update of the input value by a specified delay time
//  to prevent excessive updates, especially useful for search inputs or API calls

const useDebouncer = (inputValue, delay = 300) => {
  const [debouncedValue, setDebaouncedValue] = useState(inputValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebaouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, inputValue]);

  return debouncedValue;
};

export default useDebouncer;
