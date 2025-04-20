import React from "react";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <div className="bg-[#05203c] shadow">
      <div className="max-w-xl max-auto px-4 sm:px-6 lg:px-8 flex justify-between ">
        <div className="bg-red-100 text-white p-4 rounded">
          Dark blue background with white text
        </div>
        <Button variant="secondary" size="lg" className="mt-2">
          Hello
        </Button>
        <div className="bg-[#05203c] text-white p-4 rounded-lg">
  This background is baluu!
</div>
        header
      </div>
    </div>
  );
};
