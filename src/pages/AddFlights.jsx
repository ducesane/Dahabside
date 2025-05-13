import React, { useEffect, useState } from "react";
import supabase from "../lib/supabase";

export const AddFlights = () => {
  const [airplanes, setAirplanes] = useState([]);
  const [cities, setCities] = useState([]);
  const [form, setForm] = useState({
    airplane_id: "",
    from_city_id: "",
    to_city_id: "",
    days: [],
    direction: "outbound",
    price: "",
  });

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
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: airplanesData } = await supabase
      .from("airplanes")
      .select("*");
    const { data: citiesData } = await supabase.from("cities").select("*");
    setAirplanes(airplanesData || []);
    setCities(citiesData || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDaysChange = (day) => {
    setForm((prev) => {
      const days = prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day];
      return { ...prev, days };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { airplane_id, from_city_id, to_city_id, price } = form;

    // Validation
    if (!airplane_id || !from_city_id || !to_city_id) {
      alert("✋ Please select an airline and both cities.");
      return;
    }

    if (!price || isNaN(price) || Number(price) <= 0) {
      alert("✋ Please enter a valid positive price.");
      return;
    }

    const { error } = await supabase.from("flights").insert([form]);

    if (error) {
      alert("❌ Error: " + error.message);
      console.error("Supabase error:", error);
    } else {
      alert("✅ Flight added successfully");
      setForm({
        airplane_id: "",
        from_city_id: "",
        to_city_id: "",
        days: [],
        direction: "outbound",
        price: "",
      });
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg mt-10 border">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Add New Flight
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Airline */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Airline
          </label>
          <select
            name="airplane_id"
            value={form.airplane_id}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Airline</option>
            {airplanes.map((airplane) => (
              <option key={airplane.id} value={airplane.id}>
                {airplane.name}
              </option>
            ))}
          </select>
        </div>

        {/* From City */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            From City
          </label>
          <select
            name="from_city_id"
            value={form.from_city_id}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* To City */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            To City
          </label>
          <select
            name="to_city_id"
            value={form.to_city_id}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Days */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Days</label>
          <div className="grid grid-cols-2 gap-2">
            {weekDays.map((day) => (
              <label key={day} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.days.includes(day)}
                  onChange={() => handleDaysChange(day)}
                  className="accent-blue-500"
                />
                <span className="text-gray-700">{day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Direction */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Direction
          </label>
          <select
            name="direction"
            value={form.direction}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="outbound">Outbound</option>
            <option value="inbound">Inbound</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
          >
            Add Flight
          </button>
        </div>
      </form>
    </div>
  );
};
