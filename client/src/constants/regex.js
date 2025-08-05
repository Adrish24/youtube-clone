// This file contains regex patterns for validating user input in forms
// It is used in Signup and Login components to ensure that the data entered by users meets specific criteria.
// These patterns are used to validate usernames, emails, and passwords.
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
export  const usernameRegex = /^[A-Za-z0-9-]{6,30}$/;