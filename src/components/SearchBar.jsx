import React, { useState } from "react";
import cities from "../cities.json";

export const SearchBar = () => {
  const [fromInput, setFromInput] = useState();
  const [toInput, setToInput] = useState();
  const [fromSuggestion, setFromSuggestion] = useState([]);
  const [toSuggesstion, setToSuggestion] = useState([]);

  const handleSubmmit = () => {};

  const handleChange = (value, setInput, setSugesstion) => {
    setInput(value);
    if (value.length === 0) {
      setSugesstion([]);
      return;
    }

    const filtered = cities.filter((city) =>
      city.name.toLowerCase().includes(value.toLowerCase())
    );
    setSugesstion(filtered);

    console.log(filtered);
  };
  const handleSuggestionClick = (cityName, setInput, setSuggestion) => {
    setInput(cityName);
    setSuggestion([]);
  };
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
            <form
              onSubmit={handleSubmmit}
              className=" shadow-md rounded-lg  flex flex-col md:flex-row items-center gap-4"
            >
              <div className="relative w-full md:w-1/4">
                <input
                  type="text"
                  placeholder="From"
                  className=" w-full px-4 py-2 border rounded-md bg-white"
                  value={fromInput}
                  onChange={(e) =>
                    handleChange(
                      e.target.value,
                      setFromInput,
                      setFromSuggestion
                    )
                  }
                />
                {fromSuggestion.length > 0 && (
                  <ul className=" absolute z-10 w-full bg-white border rounded-md max-h-40 overflow-y-auto">
                    {fromSuggestion.map((city) => (
                      <li
                        key={city.id}
                        className=" p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() =>
                          handleSuggestionClick(
                            city.name,
                            setFromInput,
                            setFromSuggestion
                          )
                        }
                      >
                        {city.name}, {city.countryName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <input
                type="text"
                placeholder="To"
                className="w-full md:w-1/4 px-4 py-2 border rounded-md bg-white"
              />

              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          </div>

          <section className="w-full mt-6  ">
            <div className="  mx-auto">
              <h2 className="text-2xl font-semibold text-white">
                Top deals for you
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-3">
                <div className="bg-blue-50 p-4 rounded-lg shadow">
                  📍 Mogadisu → Kismayo{" "}
                  <span className="text-gray-500 text-sm">from $140</span>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg shadow">
                  📍 Garowe → Mogadishu{" "}
                  <span className="text-gray-500 text-sm">from $150</span>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg shadow">
                  📍 Mogadishu → Hargeysa{" "}
                  <span className="text-gray-500 text-sm">from $170</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
