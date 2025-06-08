import React from "react";
import flightRoutes from "../flightRoutes.js";

export const Footer = () => {
  return (
    <footer className="bg-[#133355] py-8 px-6 text-sm text-white overflow-hidden">
      <div className="container mx-auto">
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Popular Flight Routes</h3>
          <div className="flex flex-wrap justify-around">
            {flightRoutes.map((route, index) => (
              <div key={index} className="my-2 mx-4">
                {route.fromCityCode} to {route.toCityCode}
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          &copy; 2025 Dahabside . All rights reserved.
        </div>
      </div>
    </footer>
  );
};
