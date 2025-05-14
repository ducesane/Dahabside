import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";

export const Booking = () => {
  const [searchParams] = useSearchParams();
  const flightId = searchParams.get("flight");
  const selectedDay = searchParams.get("day");
  const selectedDate = searchParams.get("date");

  const [flight, setFlight] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlight = async () => {
      const { data, error } = await supabase
        .from("flights")
        .select(`
          *,
          airplanes ( name, image_url ),
          from_city:cities!flights_from_city_id_fkey ( name, code ),
          to_city:cities!flights_to_city_id_fkey ( name, code )
        `)
        .eq("id", flightId)
        .single();

      if (!error) setFlight(data);
    };

    if (flightId) fetchFlight();
  }, [flightId]);

  const handleContinue = () => {
    navigate(`/payment?flight=${flightId}&day=${selectedDay}&date=${selectedDate}`);
  };

  if (!flight) return <p className="text-center mt-10">Loading flight details...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Booking</h2>

      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={flight.airplanes?.image_url}
          alt={flight.airplanes?.name}
          className="w-24 h-24 object-contain border rounded"
        />

        <div>
          <p className="text-lg font-semibold">{flight.airplanes?.name}</p>
          <p>
            {flight.from_city.name} ({flight.from_city.code}) →{" "}
            {flight.to_city.name} ({flight.to_city.code})
          </p>

          <div className="mt-2 space-y-1 text-sm text-gray-600">
            <p>📅 Day: <strong>{selectedDay}</strong></p>
            <p>🗓️ Date: <strong>{selectedDate}</strong></p>
            <p>🔁 Direction: {flight.direction}</p>
            {flight.duration && <p>⏱️ Duration: {flight.duration} minutes</p>}
          </div>

          <p className="text-blue-600 font-bold mt-3 text-lg">
            Price: ${flight.price}
          </p>
        </div>
      </div>

      <button
        onClick={handleContinue}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
      >
        Continue to Payment
      </button>
    </div>
  );
};
