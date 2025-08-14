import { useState } from "react";
import { validateHandle } from "../utils/validation";

const useCreateChannel = ({ initialData }) => {
  const [formData, setFormData] = useState(initialData);
  const [invalidHandle, setInvalidHandle] = useState(true);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Validate input for the specific field
    const isHandleValid = field === "handle" ? validateHandle(value) : null;

    if (!isHandleValid) {
      setInvalidHandle(true);
    } else {
      setInvalidHandle(false);
    }
  };

  const resetFrom = () => {
    setTimeout(() => {
      setFormData(initialData);
    }, 100); // Reset form data and errors after a short delay
  };

  return {
    formData,
    invalidHandle,
    handleInputChange,
    resetFrom,
  };
};

export default useCreateChannel;
