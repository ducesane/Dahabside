import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { useAuth } from "@/Context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { user, isLoggedIn, logOut, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const hiddenPaths = ["/payment", "/booking", "/searchresults", "/passenger"];
  const hideAuthButtons = hiddenPaths.includes(location.pathname);

  return (
    <div className="w-full bg-[#05203c]">
      <header className="mx-auto h-24 flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-24">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1 className="text-white text-2xl sm:text-3xl font-semibold">
            Dahabside
          </h1>
        </div>

        {/* Menu Toggle on Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-3xl"
          >
            <IoMdMenu />
          </button>
        </div>

        {/* Nav Items */}
        <div className="hidden lg:flex items-center space-x-4">
          {!hideAuthButtons &&
            (isLoggedIn ? (
              <>
                <span className="text-white text-sm">
                  {profile?.username || "username"}
                </span>
                <div className="relative">
                  <button
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 focus:outline-none"
                    onMouseEnter={() => setIsDropDownOpen(true)}
                  >
                    {user?.avatar_url ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.avatar_url}
                        alt="avatar"
                      />
                    ) : (
                      <FaUser className="text-orange-600" />
                    )}
                  </button>
                  {isDropDownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 rounded shadow-lg z-10 bg-white"
                      onMouseLeave={() => setIsDropDownOpen(false)}
                    >
                      <Link
                        to="/adminlayout"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={logOut}
                        className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/signin"
                  className="px-4 py-2 text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium rounded-md text-orange-600 bg-white hover:bg-orange-50"
                >
                  Sign up
                </Link>
              </div>
            ))}
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-3 bg-[#05203c]">
          {!hideAuthButtons &&
            (isLoggedIn ? (
              <>
                <span className="text-white block">
                  {profile?.username || "username"}
                </span>
                <Link
                  to="/adminlayout"
                  className="block text-white hover:underline"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block text-white hover:underline"
                >
                  Profile
                </Link>
                <button
                  onClick={logOut}
                  className="block text-white hover:underline"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="block px-4 py-2 text-sm text-white bg-orange-600 rounded-md"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-sm text-orange-600 bg-white rounded-md"
                >
                  Sign up
                </Link>
              </>
            ))}
        </div>
      )}
    </div>
  );
};
