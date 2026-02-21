import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              ? "text-blue-600 font-bold underline underline-offset-4 decoration-2 block py-2"
              : "hover:text-blue-500 font-medium block py-2"
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
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <button
              onClick={toggleMobileMenu}
              className="sm:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>

            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                News <span className="text-blue-800">Today</span>
              </span>
            </Link>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <ul className="flex items-center gap-6 text-gray-600">
                {navLinks}
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-transparent transition-all">
                  {user.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <FaUserCircle className="text-3xl text-gray-400" />
                  )}
                  <span className="font-semibold text-gray-800 hidden sm:block">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 text-sm font-semibold rounded-lg border border-red-200 transition-colors"
                >
                  <FaSignOutAlt />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-gray-600 font-semibold hover:text-blue-600 px-3 py-2"
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
        <div className="sm:hidden border-t border-gray-100 bg-white">
          <ul className="px-4 pt-2 pb-4 space-y-1 text-gray-600">{navLinks}</ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
