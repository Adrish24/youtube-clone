import { createContext, useContext, useRef, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const theme = localStorage.getItem("theme") || "light"; // Default theme

  const mainContentRef = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility for xl devices

  const toggleTheme = () => {
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        toggleTheme,
        mainContentRef,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
