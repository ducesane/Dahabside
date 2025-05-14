import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";

export const Booking = () => {
  const [searchParams] = useSearchParams();
  const flightId = searchParams.get("flight");
  const [flight, setFlight] = useState(null);
  const navigate = useNavigate();

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
    const result = new Date(today);
    result.setDate(today.getDate() + diff);
    return result.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchFlight = async () => {
      if (!flightId) return;
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
        .eq("id", flightId)
        .single();

      if (error) {
        console.error("Flight fetch error:", error.message);
      } else {
        setFlight(data);
      }
    };

    fetchFlight();
  }, [flightId]);

  const handlePayment = () => {
    navigate(`/payment?flight=${flight.id}`);
  };

  if (!flight) {
    return <p className="text-center mt-10">Loading flight details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Booking</h2>

      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={flight.airplanes?.image_url}
          alt={flight.airplanes?.name}
          className="w-24 h-24 object-contain border rounded"
        />
        <div>
          <p className="text-lg font-semibold">{flight.airplanes?.name}</p>
          <p className="text-gray-700">
            {flight.from_city.name} ({flight.from_city.code}) →
            {flight.to_city.name} ({flight.to_city.code})
          </p>
          <div className="mt-2 space-y-1 text-sm text-gray-600">
            {flight.days.map((day) => (
              <p key={day}>
                {day} – {getNextDateForWeekday(day)}
              </p>
            ))}
            <p>Direction: {flight.direction}</p>
            {flight.duration && <p>Duration: {flight.duration} min</p>}
          </div>
          <p className="text-blue-600 font-bold mt-3 text-lg">
            Price: ${flight.price}
          </p>
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
      >
        Continue to Payment
      </button>
    </div>
  );
};
