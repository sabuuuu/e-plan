import { useContext } from "react";
import Logo from "/assets/logo copy.png";
import Help from "/assets/help.gif";
import { Link } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { getThemeClass } from "../utils/helpers";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav
      className={`navbar ${getThemeClass(
        "bg-gray-800 text-white p-4 mb-6 flex justify-between",
        "bg-blue-800 text-black p-4 mb-6 flex justify-between",
        theme
      )}`}
    >
      <Link to="/" className="flex items-center space-x-2">
        <img src={Logo} className="h-14" />
      </Link>

      <div className="flex items-center space-x-2">
        <div
          className={`flex justify-center items-center h-12 w-12 border-none  rounded ${
            theme === "dark" ? "bg-gray-800 " : "bg-blue-800"
          }`}
        >
          <button
            onClick={toggleTheme}
            className={`h-12 w-12 rounded p-2 ${
              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-blue-700"
            }`}
          >
            <svg
              className={`fill-violet-950 ${
                theme === "dark" ? "hidden" : "block"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg
              className={`fill-yellow-500  ${
                theme === "dark" ? "block" : "hidden"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <Link
          to="/about"
          className={`flex items-center border  rounded ${
            theme === "dark"
              ? "border-indigo-900 hover:bg-gray-700"
              : " border-indigo-200 hover:bg-indigo-300"
          }`}
        >
          <img src={Help} className="h-12" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
