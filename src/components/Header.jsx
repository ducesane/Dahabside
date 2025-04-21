import React from "react";
import { Button } from "./ui/button";
import { FaUser } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

// bg color #05203c
export const Header = () => {
  return (
    <div className="max-w-full bg-[#05203c] ">
      <header className="   mx-auto  h-24 flex   px-24  ">
        <nav className="w-full flex  items-center justify-between">
          {/* nav left */}
          <div className="bg-[#05203c]">
            <h1 className="text-white text-3xl font-semibold">Dahabside</h1>
          </div>

          <div className="flex  gap-2 items-center hover:bg-gray-600 hover:rounded h-10 px-2">
            <span>
              <FaUser className="text-white text-2xl" />
            </span>
            <button className="text-white font-bold">Login</button>
            <IoMdMenu className="text-white text-2xl" />
          </div>
        </nav>

        {/*  */}
      </header>
    </div>
  );
};
