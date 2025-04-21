import React from "react";

export const SearchBar = () => {
  return (
    <div className="max-w-full bg-[#05203c]  h-[400px] ">
      <div className=" px-24  ">
        {/* tabs */}
        <div className="flex gap-2">
          <button className="text-white rounded-full border-2 px-4   hover:border-red-100 bg-blue-500 py-1   ">
            tikityada gudaha
          </button>

          <button className="text-white rounded-full border-2 px-4  py-1 hover:border-red-100   ">
            tikityada caalamka
          </button>

          <button className="text-white rounded-full border-2 px-4  py-1 hover:border-red-100   ">
            fiiso dalbo
          </button>
        </div>
        {/*  Search card  */}
        <div className="mt-4 ">
          <p className="text-white text-2xl font-semibold">
            Si sahlan ku hel tiikit raqiis xili waliba{" "}
          </p>
          {/* search form */}
          <div className=" mt-8">
            <p className="text-white text-xl font-semibold">Baaro </p>
            {/* form */}
            <form class=" shadow-md rounded-lg  flex flex-col md:flex-row items-center gap-4">
              <input
                type="text"
                placeholder="From"
                class="w-full md:w-1/4 px-4 py-2 border rounded-md bg-white"
              />
              <input
                type="text"
                placeholder="To"
                class="w-full md:w-1/4 px-4 py-2 border rounded-md bg-white"
              />

              <button
                type="submit"
                class="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          </div>

          <section class="w-full mt-6  ">
            <div class="  mx-auto">
              <h2 class="text-2xl font-semibold text-white">
                Top deals for you
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-3">
                <div class="bg-blue-50 p-4 rounded-lg shadow">
                  📍 London → Paris{" "}
                  <span class="text-gray-500 text-sm">from $39</span>
                </div>
                <div class="bg-blue-50 p-4 rounded-lg shadow">
                  📍 New York → LA{" "}
                  <span class="text-gray-500 text-sm">from $99</span>
                </div>
                <div class="bg-blue-50 p-4 rounded-lg shadow">
                  📍 Nairobi → Dubai{" "}
                  <span class="text-gray-500 text-sm">from $199</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
