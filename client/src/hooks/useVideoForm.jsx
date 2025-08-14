import { useState } from "react";

const useVideoForm = (initialData) => {
  const [formData, setFormData] = useState(initialData);
  const [formNotValid, setFormNotValid] = useState(true);

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // Validate input for the specific field
      // Check if all required fields are filled
      const allFilled = Object.values(updated).every((val) => val.length > 0);
      if (!allFilled) {
        setFormNotValid(true);
      } else {
        setFormNotValid(false);
      }

      return updated;
    });
  };

  const resetFrom = () => {
    setTimeout(() => {
      setFormData(initialData);
    }, 100); // Reset form data and errors after a short delay
  };

  return {
    formData,
    formNotValid,
    handleInputChange,
    resetFrom,
  };
};

export default useVideoForm;
