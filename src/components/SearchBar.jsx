import React, { useState } from "react";
import cities from "../cities.json";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [fromSuggestion, setFromSuggestion] = useState([]);
  const [toSuggesstion, setToSuggestion] = useState([]);

  const navigate = useNavigate();

  const handleSubmmit = (e) => {
    e.preventDefault();
    if (fromInput && toInput) {
      navigate(
        `/searchresults?from=${encodeURIComponent(
          fromInput
        )}&to=${encodeURIComponent(toInput)}`
      );
    }
  };

  const handleDealClick = (from, to) => {
    navigate(`/searchresults?from=${from}&to=${to}`);
  };

  const handleChange = (value, setInput, setSugesstion) => {
    setInput(value);
    if (value.length === 0) return setSugesstion([]);
    const filtered = cities.filter((city) =>
      city.name.toLowerCase().includes(value.toLowerCase())
    );
    setSugesstion(filtered);
  };

  const handleSuggestionClick = (cityName, setInput, setSuggestion) => {
    setInput(cityName);
    setSuggestion([]);
  };

  return (
    <div className="max-w-full bg-[#05203c] py-8">
      <div className="px-4 sm:px-6 md:px-10 lg:px-24">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button className="text-white rounded-full border-2 px-4 hover:border-red-100 bg-blue-500 py-1">
            tikityada gudaha
          </button>
          <button className="text-white rounded-full border-2 px-4 py-1 hover:border-red-100">
            tikityada caalamka
          </button>
          <button className="text-white rounded-full border-2 px-4 py-1 hover:border-red-100">
            fiiso dalbo
          </button>
        </div>

        {/* Heading */}
        <p className="text-white text-2xl font-semibold">
          Si sahlan ku hel tiikit raqiis xili waliba
        </p>

        {/* Search Form */}
        <div className="mt-8">
          <p className="text-white text-xl font-semibold mb-3">Baaro</p>
          <form
            onSubmit={handleSubmmit}
            className="shadow-md rounded-lg flex flex-col md:flex-row items-center gap-4"
          >
            {/* From */}
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="From"
                className="w-full px-4 py-2 border rounded-md bg-white"
                value={fromInput}
                onChange={(e) =>
                  handleChange(e.target.value, setFromInput, setFromSuggestion)
                }
              />
              {fromSuggestion.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded-md max-h-40 overflow-y-auto">
                  {fromSuggestion.map((city) => (
                    <li
                      key={city.id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
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

            {/* To */}
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="To"
                className="w-full px-4 py-2 border rounded-md bg-white"
                value={toInput}
                onChange={(e) =>
                  handleChange(e.target.value, setToInput, setToSuggestion)
                }
              />
              {toSuggesstion.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded-md max-h-40 overflow-y-auto">
                  {toSuggesstion.map((city) => (
                    <li
                      key={city.id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() =>
                        handleSuggestionClick(
                          city.name,
                          setToInput,
                          setToSuggestion
                        )
                      }
                    >
                      {city.name}, {city.countryName}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>

        {/* Top Deals */}
        <section className="w-full mt-10 py-6">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Top deals for you
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div
              className="bg-blue-50 p-4 rounded-lg shadow cursor-pointer"
              onClick={() => handleDealClick("Mogadishu", "Kismayo")}
            >
              📍 Mogadishu → Kismayo
              <span className="block text-gray-500 text-sm">from $140</span>
            </div>
            <div
              className="bg-blue-50 p-4 rounded-lg shadow cursor-pointer"
              onClick={() => handleDealClick("Mogadishu", "Garowe")}
            >
              📍 Mogadishu → Garowe
              <span className="block text-gray-500 text-sm">from $150</span>
            </div>
            <div
              className="bg-blue-50 p-4 rounded-lg shadow cursor-pointer"
              onClick={() => handleDealClick("Mogadishu", "Hargeysa")}
            >
              📍 Mogadishu → Hargeysa
              <span className="block text-gray-500 text-sm">from $170</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
