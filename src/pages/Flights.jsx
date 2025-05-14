import React, { useEffect, useState } from "react";
import supabase from "../lib/supabase";

export const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [sortBy, setSortBy] = useState("from");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      const { data, error } = await supabase
        .from("flights")
        .select(`
          id,
          days,
          direction,
          price,
          from_city:cities!from_city_id(name),
          to_city:cities!flights_to_city_id_fkey(name),
          airplanes(name)
        `);

      if (!error && data) {
        setFlights(data);
      } else {
        console.error("Error fetching flights:", error);
      }
      setLoading(false);
    };
    fetchFlights();
  }, []);

  const sortedFlights = [...flights].sort((a, b) => {
    const getValue = (item) => {
      switch (sortBy) {
        case "from":
          return item.from_city?.name || "";
        case "to":
          return item.to_city?.name || "";
        case "airline":
          return item.airplanes?.name || "";
        case "days":
          return Array.isArray(item.days) ? item.days[0] || "" : "";
        default:
          return "";
      }
    };
    return getValue(a).localeCompare(getValue(b));
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Flights</h2>

      {/* Sort Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Sort by:</label>
        <select
          className="border rounded px-3 py-1"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="from">From City</option>
          <option value="to">To City</option>
          <option value="airline">Airline</option>
          <option value="days">Day</option>
        </select>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading flights...</div>
      ) : sortedFlights.length === 0 ? (
        <div className="text-gray-500">No flights available.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border">From</th>
                <th className="px-4 py-2 border">To</th>
                <th className="px-4 py-2 border">Airline</th>
                <th className="px-4 py-2 border">Days</th>
              </tr>
            </thead>
            <tbody>
              {sortedFlights.map((flight, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 border">{flight.from_city?.name}</td>
                  <td className="px-4 py-2 border">{flight.to_city?.name}</td>
                  <td className="px-4 py-2 border">{flight.airplanes?.name}</td>
                  <td className="px-4 py-2 border">
                    {Array.isArray(flight.days)
                      ? flight.days.join(", ")
                      : flight.days}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
