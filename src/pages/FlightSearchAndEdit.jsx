import React, { useEffect, useState } from "react";
import supabase from "../lib/supabase";

export const FlightSearchAndEdit = () => {
  const [cities, setCities] = useState([]);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [flights, setFlights] = useState([]);
  const [editingFlightId, setEditingFlightId] = useState(null);

  const [airplanes, setAirplanes] = useState([]);

  useEffect(() => {
    fetchCities();
    fetchAirplanes();
  }, []);

  const fetchCities = async () => {
    const { data } = await supabase.from("cities").select("*");
    setCities(data || []);
  };

  const fetchAirplanes = async () => {
    const { data } = await supabase.from("airplanes").select("*");
    setAirplanes(data || []);
  };

  const searchFlights = async () => {
    const { data, error } = await supabase
      .from("flights")
      .select(
        "*, airplanes(name), from_city:cities!flights_from_city_id_fkey(name), to_city:cities!flights_to_city_id_fkey(name)"
      )
      .eq("from_city_id", fromCity)
      .eq("to_city_id", toCity);

    setFlights(data || []);
  };

  const handleEditChange = (flightId, name, value) => {
    setFlights((prev) =>
      prev.map((f) => (f.id === flightId ? { ...f, [name]: value } : f))
    );
  };

  const handleDaysToggle = (flightId, day) => {
    setFlights((prev) =>
      prev.map((f) => {
        if (f.id !== flightId) return f;
        const newDays = f.days.includes(day)
          ? f.days.filter((d) => d !== day)
          : [...f.days, day];
        return { ...f, days: newDays };
      })
    );
  };

  const saveFlight = async (flight) => {
    const { error } = await supabase
      .from("flights")
      .update(flight)
      .eq("id", flight.id);
    if (error) {
      alert("Failed to update: " + error.message);
    } else {
      alert("✅ Flight updated!");
      setEditingFlightId(null);
    }
  };

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Search & Edit Flights</h2>

      {/* Search Bar */}
      <div className="flex gap-4">
        <select value={fromCity} onChange={(e) => setFromCity(e.target.value)}>
          <option value="">From City</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select value={toCity} onChange={(e) => setToCity(e.target.value)}>
          <option value="">To City</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          onClick={searchFlights}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {flights.map((flight) => (
          <div key={flight.id} className="border p-4 rounded">
            <p>✈️ {flight.airplanes.name}</p>
            <p>
              📍 {flight.from_city.name} → {flight.to_city.name}
            </p>
            <p>💸 ${flight.price}</p>
            <p>📅 {flight.days.join(", ")}</p>
            <p>🔁 {flight.direction}</p>
            <button
              onClick={() => setEditingFlightId(flight.id)}
              className="text-blue-600 mt-2 underline"
            >
              {editingFlightId === flight.id ? "Cancel" : "Edit"}
            </button>

            {/* Inline Edit Form */}
            {editingFlightId === flight.id && (
              <div className="mt-4 space-y-2 bg-gray-100 p-4 rounded">
                <select
                  value={flight.airplane_id}
                  onChange={(e) =>
                    handleEditChange(flight.id, "airplane_id", e.target.value)
                  }
                >
                  {airplanes.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  value={flight.price}
                  onChange={(e) =>
                    handleEditChange(flight.id, "price", e.target.value)
                  }
                  placeholder="Price"
                />

                <select
                  value={flight.direction}
                  onChange={(e) =>
                    handleEditChange(flight.id, "direction", e.target.value)
                  }
                >
                  <option value="outbound">Outbound</option>
                  <option value="inbound">Inbound</option>
                </select>

                <div className="grid grid-cols-2 gap-2">
                  {weekDays.map((day) => (
                    <label key={day} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={flight.days.includes(day)}
                        onChange={() => handleDaysToggle(flight.id, day)}
                      />
                      {day}
                    </label>
                  ))}
                </div>

                <button
                  onClick={() => saveFlight(flight)}
                  className="bg-green-600 text-white px-4 py-1 rounded mt-2"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
