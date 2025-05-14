import React, { useEffect, useState } from "react";
import supabase from "../lib/supabase";

export const Passenger = () => {
  const [latestBooking, setLatestBooking] = useState(null);

  useEffect(() => {
    const fetchLatestBooking = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          flights (
            price,
            direction,
            duration,
            airplanes ( name ),
            from_city:cities!flights_from_city_id_fkey ( name, code ),
            to_city:cities!flights_to_city_id_fkey ( name, code )
          )
        `)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (!error) setLatestBooking(data);
    };

    fetchLatestBooking();
  }, []);

  if (!latestBooking) return <p className="text-center mt-10">Loading confirmation...</p>;

  const flight = latestBooking.flights;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Booking Confirmed ✅</h2>

      <p className="mb-2">
        Thank you <span className="font-semibold">{latestBooking.passenger_name}</span>!
      </p>

      <div className="space-y-2 text-sm text-gray-700">
        <p>Email: {latestBooking.email}</p>
        <p>Phone: {latestBooking.phone}</p>

        <hr className="my-3" />

        <p>✈️ Airline: <strong>{flight.airplanes.name}</strong></p>
        <p>📍 {flight.from_city.name} → {flight.to_city.name}</p>
        <p>🔁 Direction: {flight.direction}</p>
        <p>📅 Day: {latestBooking.flight_day}</p>
        <p>🗓️ Date: {latestBooking.flight_date}</p>
        {flight.duration && <p>⏱️ Duration: {flight.duration} min</p>}
        <p className="text-blue-600 font-bold mt-2">💵 Paid: ${flight.price}</p>
      </div>

      <p className="mt-4 text-green-600 font-semibold">Your ticket will be sent shortly via email or SMS.</p>
    </div>
  );
};
