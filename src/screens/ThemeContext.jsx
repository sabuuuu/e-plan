import { createContext, useState, useEffect } from "react";

import PropTypes from "prop-types";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const getInitialTheme = () => {
      try {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
          return savedTheme;
        }

        // Check for system theme prefs
        const systemTheme =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        return systemTheme;
      } catch (error) {
        // If accessing localStorage fails, return a default theme
        return "light";
      }
    };

    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const changeThemeOnSystemChange = () =>
      setTheme(mediaQuery.matches ? "dark" : "light");

    mediaQuery.addEventListener("change", changeThemeOnSystemChange);

    return () =>
      mediaQuery.removeEventListener("change", changeThemeOnSystemChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    try {
      localStorage.setItem("theme", newTheme);
    } catch (error) {
      // Handle possible errors here
    }
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
