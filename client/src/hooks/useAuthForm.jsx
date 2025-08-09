import { useState } from "react";
import { validateInput } from "../utils"; // Import validation functions

const useAuthForm = (initialData = {}, strictValidation = true) => {
  const [formData, setFormData] = useState(initialData);

  const [errors, setErrors] = useState({});

  // Handle input changes and update form data
  // and validate input
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (strictValidation) {
      // Validate input for the specific field
      const isValid = validateInput(field, value);

      // Set error state if input is invalid
      setErrors((prev) => ({ ...prev, [field]: !isValid }));
    } else {
      const isEmpty = value.trim() === "";
      setErrors((prev) => ({ ...prev, [field]: isEmpty }));
    }
  };

  const resetFrom = () => {
    setTimeout(() => {
      setFormData(initialData);
      setErrors({});
    }, 100); // Reset form data and errors after a short delay
  };

  return {
    formData,
    errors,
    handleInputChange,
    resetFrom,
  };
};

export default useAuthForm;
