// Import regex patterns from constants folder
import { usernameRegex, emailRegex, passwordRegex } from "../constants/regex";

// Validate form data
export const validateEmail = (email) => {
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return passwordRegex.test(password);
};

export const validateUsername = (username) => {
  return usernameRegex.test(username);
};

// Validate input based on field type
// This function can be used to validate individual fields in forms
export const validateInput = (field, value) => {
  let isValid = false;
  switch (field) {
    case "username":
      isValid = validateUsername(value);
      break;
    case "email":
      isValid = validateEmail(value);
      break;
    case "password":
      isValid = validatePassword(value);
      break;
    default:
      isValid = true; // If field is not recognized, assume valid
  }
  return isValid;
};

// Validate form data based on required fields
// This function can be used to validate the entire form before submission
export const validateForm = (data, requiredFields) => {
  for (const field of requiredFields) {
    if (!data[field] || !validateInput(field, data[field])) {
      return false; // If any required field is invalid or missing, return false
    }
  }
  return true; // All required fields are valid
};
