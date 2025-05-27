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
  const [isloading, setIsLoading] = useState(false);
  const [noCitiesFound, setNoCitiesFound] = useState(false);

  useEffect(() => {
    document.title = `Flight from ${fromCity} to ${toCity}`;
  }, [fromCity, toCity]);

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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
    if (diff < 0) diff += 7;

    const nextDate = new Date();
    nextDate.setDate(today.getDate() + diff);
    nextDate.setHours(0, 0, 0, 0);

    return nextDate;
  };

  const handleBook = (flightId, day, date) => {
    const formattedDate = date.toISOString().split("T")[0];
    navigate(`/booking?flight=${flightId}&day=${day}&date=${formattedDate}`);
  };

  useEffect(() => {
    const fetchFlights = async () => {
      if (!fromCity || !toCity) return;

      // Step 1: Get the city IDs
      setIsLoading(true);
      setNoCitiesFound(false);
      const { data: cities } = await supabase
        .from("cities")
        .select("id, name")
        .in("name", [fromCity, toCity]);

      const fromCityObj = cities.find(
        (c) => c.name.toLowerCase() === fromCity.toLowerCase()
      );
      const toCityObj = cities.find(
        (c) => c.name.toLowerCase() === toCity.toLowerCase()
      );

      if (!fromCityObj || !toCityObj) {
        setFlights([]);
        setFilteredFlights([]);
        setNoCitiesFound(true);
        setIsLoading(false);
        return;
      }

      // Step 2: Fetch flights using city IDs
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
        .eq("from_city_id", fromCityObj.id)
        .eq("to_city_id", toCityObj.id);

      if (data) {
        setFlights(data);
        setFilteredFlights(data);
        setPriceFilter(Math.max(...data.map((f) => f.price || 0), 500));
      }
      setIsLoading(false);
    };

    fetchFlights();
  }, [fromCity, toCity]);

  useEffect(() => {
    let filtered = [...flights];

    // 1. Filter by price
    if ((priceFilter) => 0) {
      filtered = filtered.filter((f) => f.price <= priceFilter);
    }

    // 2. Filter by selected weekday
    if (dayFilter) {
      filtered = filtered.filter((f) => f.days.includes(dayFilter));
    }

    // 3. Sort by the soonest actual upcoming flight day
    filtered.sort((a, b) => {
      const getSoonestTime = (days) => {
        return Math.min(
          ...days.map((day) => getNextDateForWeekday(day).getTime())
        );
      };

      return getSoonestTime(a.days) - getSoonestTime(b.days);
    });

    // 4. Update filtered flights state
    setFilteredFlights(filtered);
  }, [priceFilter, dayFilter, flights]);

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
      {isloading ? (
        <p className="text-gray-600">Searching flights...</p>
      ) : noCitiesFound ? (
        <p className="text-red-600 font-semibold">
          No matching cities found for your search.
        </p>
      ) : filteredFlights.length === 0 ? (
        <p className="text-gray-600">No matching flights found.</p>
      ) : (
        <ul className="space-y-4 py-8">
          {filteredFlights.map((flight) => (
            <li
              key={flight.id}
              className="bg-white p-4 rounded-lg shadow border flex flex-col sm:flex-row gap-4"
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
                <p className="text-sm text-gray-500">
                  Direction: {flight.direction}
                </p>
                {flight.duration && (
                  <p className="text-sm text-gray-500">
                    Duration: {flight.duration} min
                  </p>
                )}
                <p className="text-blue-600 font-semibold mt-2">
                  ${flight.price}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {flight.days.map((day) => {
                    const date = getNextDateForWeekday(day);
                    const label = date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    });

                    return (
                      <button
                        key={day}
                        onClick={() => handleBook(flight.id, day, date)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      >
                        {day} – {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
