import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";

export const Payment = () => {
  const [searchParams] = useSearchParams();
  const flightId = searchParams.get("flight");
  const selectedDay = searchParams.get("day");
  const selectedDate = searchParams.get("date");

  const [flight, setFlight] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
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

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleConfirmPayment = async () => {
    if (!form.name || !form.email || !form.phone) {
      alert("Please fill all passenger details.");
      return;
    }

    const { error } = await supabase.from("bookings").insert({
      flight_id: flightId,
      passenger_name: form.name,
      email: form.email,
      phone: form.phone,
      flight_day: selectedDay,
      flight_date: selectedDate,
      status: "confirmed",
    });

    if (error) {
      console.error("❌ Booking error:", error.message);
      navigate("/payment-failed");
    } else {
      navigate("/passenger");
    }
  };

  if (!flight) return <p className="text-center mt-10">Loading payment info...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Payment Summary</h2>

      <div className="mb-6">
        <p className="text-lg font-semibold">{flight.airplanes?.name}</p>
        <p>
          {flight.from_city.name} ({flight.from_city.code}) →{" "}
          {flight.to_city.name} ({flight.to_city.code})
        </p>
        <p className="text-sm text-gray-600 mt-2">
          📅 Day: <strong>{selectedDay}</strong>
          <br />
          🗓️ Date: <strong>{selectedDate}</strong>
          <br />
          🔁 Direction: {flight.direction}
          {flight.duration && <><br />⏱️ Duration: {flight.duration} min</>}
        </p>
        <p className="text-blue-600 font-bold text-lg mt-2">
          Total: ${flight.price}
        </p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        onClick={handleConfirmPayment}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
      >
        Confirm & Pay
      </button>
    </div>
  );
};
