import React from "react";
import { Button } from "./ui/button";

// bg color #05203c
export const Header = () => {
  return (
    <div className="max-w-full bg-[#05203c]">
      <header className="   mx-auto  h-24 flex   px-24  ">
        <nav className="w-full flex  items-center justify-between">
          
          {/* nav left */}
          <div className=" ">
            <h1 className="text-white  text-3xl font-semibold" >Dahabside</h1>
          </div>

          <div>
            <h2>Login</h2>
          </div>
        </nav>
      </header>
    </div>
  );
};
