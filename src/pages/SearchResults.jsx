import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const fromCity = searchParams.get("from");
  const toCity = searchParams.get("to");

  const navigate = useNavigate();

  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [priceFilter, setPriceFilter] = useState(0);
  const [dayFilter, setDayFilter] = useState("");

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // 🔧 Get next date for weekday
  const getNextDateForWeekday = (weekday) => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    const todayIndex = today.getDay();
    const targetIndex = weekdays.indexOf(weekday);

    let diff = targetIndex - todayIndex;
    if (diff <= 0) diff += 7;

    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + diff);

    return nextDate;
  };

  // 📦 Fetch flights
  useEffect(() => {
    const fetchFlights = async () => {
      const { data, error } = await supabase
        .from("flights")
        .select(
          `
          *,
          airplanes(name, image_url),
          from_city:cities!flights_from_city_id_fkey(name, code),
          to_city:cities!flights_to_city_id_fkey(name, code)
        `
        )
        .ilike("from_city.name", fromCity)
        .ilike("to_city.name", toCity);

      if (data) {
        setFlights(data);
        setFilteredFlights(data);
        setPriceFilter(Math.max(...data.map((f) => f.price || 0), 500));
      }
    };

    if (fromCity && toCity) fetchFlights();
  }, [fromCity, toCity]);

  // 🧹 Filter & sort flights
  useEffect(() => {
    let filtered = [...flights];

    if (priceFilter > 0) {
      filtered = filtered.filter((f) => f.price <= priceFilter);
    }

    if (dayFilter) {
      filtered = filtered.filter((f) => f.days.includes(dayFilter));
    }

    // 🗓️ Sort by soonest upcoming date
    filtered.sort((a, b) => {
      const aDate = getNextDateForWeekday(a.days[0]);
      const bDate = getNextDateForWeekday(b.days[0]);
      return aDate - bDate;
    });

    setFilteredFlights(filtered);
  }, [priceFilter, dayFilter, flights]);

  const handleBook = (flightId) => {
    navigate(`/booking?flight=${flightId}`);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4">
        Flights from <span className="text-blue-600">{fromCity}</span> to{" "}
        <span className="text-blue-600">{toCity}</span>
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6 bg-gray-100 p-4 rounded-lg">
        <div>
          <label className="block text-sm font-semibold mb-1">
            Max Price ($)
          </label>
          <input
            type="range"
            min="0"
            max={Math.max(...flights.map((f) => f.price || 0), 500)}
            value={priceFilter}
            onChange={(e) => setPriceFilter(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-700">${priceFilter}</span>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Filter by Day
          </label>
          <select
            value={dayFilter}
            onChange={(e) => setDayFilter(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Any Day</option>
            {weekDays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Flight Results */}
      {filteredFlights.length === 0 ? (
        <p className="text-gray-600">No matching flights found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredFlights.map((flight) => (
            <li
              key={flight.id}
              className="bg-white p-4 rounded-lg shadow border flex flex-col sm:flex-row items-start gap-4"
            >
              <img
                src={flight.airplanes?.image_url}
                alt={flight.airplanes?.name}
                className="w-20 h-20 object-contain rounded border"
              />
              <div className="flex-1">
                <p className="text-lg font-bold">{flight.airplanes?.name}</p>
                <p className="text-gray-700">
                  {flight.from_city?.name} ({flight.from_city?.code}) →{" "}
                  {flight.to_city?.name} ({flight.to_city?.code})
                </p>
                <div className="text-sm text-gray-500 mt-1 space-y-1">
                  {flight.days.map((day) => {
                    const date = getNextDateForWeekday(day);
                    return (
                      <p key={day}>
                        {day} –{" "}
                        {date.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    );
                  })}
                  <p>Direction: {flight.direction}</p>
                  {flight.duration && <p>Duration: {flight.duration} min</p>}
                </div>
                <p className="text-blue-600 font-semibold mt-2">
                  ${flight.price}
                </p>
              </div>
              <button
                onClick={() => handleBook(flight.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-2 sm:mt-0"
              >
                Book Now
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
