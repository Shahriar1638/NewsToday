import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("news_dark_mode");
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("news_dark_mode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = (
    <>
      <li onClick={() => setIsMobileMenuOpen(false)}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 dark:text-blue-400 font-bold underline underline-offset-4 decoration-2 block py-2"
              : "hover:text-blue-500 dark:hover:text-blue-400 font-medium block py-2"
          }
        >
          All News
        </NavLink>
      </li>
      {user && (
        <>
          <li onClick={() => setIsMobileMenuOpen(false)}>
            <NavLink
              to="/bookmarks"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold underline underline-offset-4 decoration-2 block py-2"
                  : "hover:text-blue-500 font-medium block py-2"
              }
            >
              Bookmarks
            </NavLink>
          </li>
          <li onClick={() => setIsMobileMenuOpen(false)}>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold underline underline-offset-4 decoration-2 block py-2"
                  : "hover:text-blue-500 font-medium block py-2"
              }
            >
              Favourites
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 shadow transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <button
              onClick={toggleMobileMenu}
              className="sm:hidden text-gray-600 dark:text-gray-300 hover:text-blue-600 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>

            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                News <span className="text-blue-800 dark:text-blue-400">Today</span>
              </span>
            </Link>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <ul className="flex items-center gap-6 text-gray-600 dark:text-gray-300">
                {navLinks}
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-transparent transition-all">
                  {user.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                    />
                  ) : (
                    <FaUserCircle className="text-3xl text-gray-400 dark:text-gray-500" />
                  )}
                  <span className="font-semibold text-gray-800 dark:text-gray-200 hidden sm:block">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 px-3 py-2 text-sm font-semibold rounded-lg border border-red-200 dark:border-red-800 transition-colors"
                >
                  <FaSignOutAlt />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-gray-600 dark:text-gray-300 font-semibold hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-sm transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
          <ul className="px-4 pt-2 pb-4 space-y-1 text-gray-600 dark:text-gray-300">{navLinks}</ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
