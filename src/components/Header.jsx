import React, { useState } from "react";
import { Button } from "./ui/button";
import { FaUser } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { useAuth } from "@/context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

// bg color #05203c
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { user, isLoggedIn, logOut, profile } = useAuth();
  const navigate = useNavigate();
  console.log("commeeting from header", isLoggedIn, user);
  return (
    <div className="max-w-full bg-[#05203c] ">
      <header className="   mx-auto  h-24 flex   px-24  ">
        <nav className="w-full flex  items-center justify-between">
          {/* nav left */}
          <div className="bg-[#05203c]">
            <h1
              className="text-white text-3xl font-semibold"
              onClick={() => navigate("/")}
            >
              Dahabside
            </h1>
          </div>

          <div className="  flex items-center space-x-4 ">
            {/* right */}

            {isLoggedIn ? (
              <>
                <div className="text-sm text-gray-700">
                  {/* profile */}
                  <span className="text-white text-xl">
                    {" "}
                    {profile?.username || "username"}
                  </span>
                </div>

                <div className="relative">
                  <button
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 "
                    onMouseEnter={() => setIsDropDownOpen(true)}
                  >
                    {user?.avatar_url ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.avatar_url}
                      />
                    ) : (
                      <FaUser className="text-orange-600" />
                    )}
                  </button>
                  {/* dropdown Menu */}
                  {isDropDownOpen && (
                    <div
                      className="absolute right-0 w-48 mt-1 rounded shadow-lg z-10 bg-white"
                      onMouseLeave={() => setIsDropDownOpen(false)}
                    >
                      <div className=""> </div>
                      <Link
                        to={"/adminlayout"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>

                      <Link
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        to={"/manage-articles"}
                      >
                        Manage Articles
                      </Link>
                      <button
                        className="block px-4 py-2 text-sm w-full text-start text-gray-700 hover:bg-gray-100"
                        onClick={logOut}
                      >
                        Signout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div>
                {/* Buttonska */}
                <div className="space-x-2">
                  <Link
                    to="signin"
                    className="inline-flex  items-center justify-center px-4 py-2
                              border border-transparent text-sm font-medium rounded-md text-white 
                              bg-orange-600 hover:bg-orang focus:outline-none focus:ring-2 focus:ring-offset-2
                                focus:ring-orange-100
                            "
                  >
                    Sign in
                  </Link>

                  <Link
                    to="signup"
                    className="inline-flex  items-center justify-center px-4 py-2
                              border   text-sm font-medium rounded-md text-orange-600 
                              bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2
                                focus:ring-orange-600
                            "
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/*  */}
      </header>
    </div>
  );
};
