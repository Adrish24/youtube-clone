import { useState } from "react";
import { VIDEO_CATEGORY } from "../../constants/category";
import { useRef } from "react";
import { useEffect } from "react";

const SelectField = ({
  id,
  styles,
  label,
  type,
  title,
  placeholder,
  value,
  onChange,
  required = true,
}) => {
  const inputRef = useRef(null);
  const menuRef = useRef(null);
  const [showCategories, setShowCategories] = useState(false);

  //  Function to handle adding or removing a category
  //  from the input value when a category is clicked
  //  If the category is already in the value, it will be removed,
  //  otherwise it will be added to the value.
  //  This allows for multiple categories to be selected
  const handleAddCategory = (category) => {
    let newValue;
    if (value.includes(category)) {
      newValue = value.filter((cat) => cat !== category);
    } else {
      newValue = [...value, category];
    }
    if (onChange) {
      onChange({ target: { value: newValue } });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setShowCategories(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles?.container}>
      <label htmlFor={id} className={`label mb-1 ${styles?.label}`}>
        {label}
      </label>
      <input
        ref={inputRef}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setShowCategories((prev) => !prev);
        }}
        type={type}
        value={value}
        required={required}
        title={title}
        placeholder={placeholder}
        className={`input outline-none border-none  ${styles?.select}`}
        readOnly
      ></input>
      {showCategories ? (
        <div
          ref={menuRef}
          className="absolute bg-base-300 z-50 py-2 w-full h-50 overflow-y-auto"
        >
          {VIDEO_CATEGORY
            // Filter out unwanted categories
            .filter(
              (category) =>
                category !== "All" &&
                category !== "Recently uploaded" &&
                category !== "Watched" &&
                category !== "New to you"
            )

            // Sort categories alphabetically
            .sort((a, b) => a.localeCompare(b))

            // Map through the categories and create a div for each
            // category that can be clicked to add it to the input
            .map((category) => (
              <div
                className="hover:bg-base-100 cursor-pointer px-2 py-1"
                key={category}
                onClick={() => handleAddCategory(category)}
              >
                {category}
              </div>
            ))}
        </div>
      ) : null}
    </div>
  );
};

export default SelectField;
