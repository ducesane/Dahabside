import React, { useEffect, useState } from "react";
import supabase from "../lib/supabase";

export const FlightSearchAndEdit = () => {
  const [cities, setCities] = useState([]);
  const [airplanes, setAirplanes] = useState([]);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [flights, setFlights] = useState([]);
  const [editingFlightId, setEditingFlightId] = useState(null);
  const [message, setMessage] = useState("");

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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
    setMessage("Searching...");
    const { data, error } = await supabase
      .from("flights")
      .select(
        "*, airplanes(name), from_city:cities!flights_from_city_id_fkey(name), to_city:cities!flights_to_city_id_fkey(name)"
      )
      .eq("from_city_id", fromCity)
      .eq("to_city_id", toCity);

    if (error) {
      setMessage("❌ Error searching flights");
    } else {
      setFlights(data || []);
      setMessage(data?.length ? "" : "No flights found.");
    }
  };

  const handleEditChange = (id, field, value) => {
    setFlights((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  const handleDaysToggle = (id, day) => {
    setFlights((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        const updatedDays = f.days.includes(day)
          ? f.days.filter((d) => d !== day)
          : [...f.days, day];
        return { ...f, days: updatedDays };
      })
    );
  };

  const saveFlight = async (flight) => {
    const updatedFlight = {
      airplane_id: flight.airplane_id,
      from_city_id: flight.from_city_id,
      to_city_id: flight.to_city_id,
      days: flight.days,
      direction: flight.direction,
      price: flight.price,
    };

    const { error } = await supabase
      .from("flights")
      .update(updatedFlight)
      .eq("id", flight.id);

    if (error) {
      alert("❌ Failed to save: " + error.message);
    } else {
      setEditingFlightId(null);
      setMessage("✅ Flight updated successfully.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Search & Edit Flights</h2>

      {/* Search Form */}
      <div className="bg-white shadow p-4 rounded-lg flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium mb-1">From City</label>
          <select
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Select From</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium mb-1">To City</label>
          <select
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Select To</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={searchFlights}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-6"
        >
          Search
        </button>
      </div>

      {/* Status Message */}
      {message && <div className="text-sm text-gray-700 mb-4">{message}</div>}

      {/* Flight Results */}
      <div className="space-y-6">
        {flights.map((flight) => (
          <div key={flight.id} className="bg-white p-4 rounded shadow border">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-lg font-bold">✈️ {flight.airplanes?.name}</p>
                <p className="text-gray-600">
                  {flight.from_city?.name} → {flight.to_city?.name}
                </p>
                <p className="text-sm text-gray-500">
                  📅 {flight.days.join(", ")} | 🔁 {flight.direction}
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingFlightId(
                    editingFlightId === flight.id ? null : flight.id
                  )
                }
                className="text-blue-600 underline"
              >
                {editingFlightId === flight.id ? "Cancel" : "Edit"}
              </button>
            </div>

            {/* Edit Form */}
            {editingFlightId === flight.id && (
              <div className="space-y-4 bg-gray-50 p-4 rounded border">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Airline</label>
                    <select
                      value={flight.airplane_id}
                      onChange={(e) =>
                        handleEditChange(
                          flight.id,
                          "airplane_id",
                          e.target.value
                        )
                      }
                      className="w-full border rounded p-2"
                    >
                      {airplanes.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      value={flight.price || ""}
                      onChange={(e) =>
                        handleEditChange(flight.id, "price", e.target.value)
                      }
                      className="w-full border rounded p-2"
                      placeholder="Enter price"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium">Direction</label>
                  <select
                    value={flight.direction}
                    onChange={(e) =>
                      handleEditChange(flight.id, "direction", e.target.value)
                    }
                    className="w-full border rounded p-2"
                  >
                    <option value="outbound">Outbound</option>
                    <option value="inbound">Inbound</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Operating Days
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                    {weekDays.map((day) => (
                      <label key={day} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={flight.days.includes(day)}
                          onChange={() => handleDaysToggle(flight.id, day)}
                          className="accent-blue-600"
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => saveFlight(flight)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-3"
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
