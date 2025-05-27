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
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlight = async () => {
      const { data, error } = await supabase
        .from("flights")
        .select(
          `
          *,
          airplanes ( name, image_url ),
          from_city:cities!flights_from_city_id_fkey ( name, code ),
          to_city:cities!flights_to_city_id_fkey ( name, code )
        `
        )
        .eq("id", flightId)
        .single();

      if (error) {
        console.error("❌ Error loading flight:", error.message);
      } else {
        setFlight(data);
      }
    };

    if (flightId) fetchFlight();
  }, [flightId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "phone") {
      const trimmed = value.trim();
      const isPlus = trimmed.startsWith("+");

      if (digitsOnly.length < 10 || digitsOnly.length > 15) {
        setPhoneError("Phone must be between 10 and 15 digits long.");
      } else {
        setPhoneError("");
      }
    }
  };

  const handleConfirmPayment = async () => {
    const { name, email, phone } = form;

    if (!name || !email || !phone) {
      alert("Please fill all passenger details.");
      return;
    }

    const trimmed = phone.trim();
    const digitsOnly = trimmed.replace(/^\+|^00/, "");

    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      alert(
        "Phone number must start with + or 00 and be 10 to 15 digits long."
      );
      return;
    }

    const { error } = await supabase.from("bookings").insert({
      flight_id: flightId,
      passenger_name: name,
      email,
      phone,
      flight_day: selectedDay,
      flight_date: selectedDate,
      status: "confirmed",
    });

    if (error) {
      console.error("❌ Booking error:", error.message);
      navigate("/payment-failed");
      return;
    }

    try {
      await fetch(
        "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZiMDYzNjA0Mzc1MjZjNTUzZDUxMzUi_pc",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            phone,
            flight_id: flightId,
            flight_day: selectedDay,
            flight_date: selectedDate,
            flight_price: flight.price,
            flight_fromcity: flight.from_city,
            flight_toCity: flight.to_city,
            flight_airplane: flight.airplanes?.name,
          }),
        }
      );
    } catch (err) {
      console.error("❌ Webhook error:", err.message);
    }

    navigate("/passenger");
  };

  if (!flight)
    return <p className="text-center mt-10">Loading payment info...</p>;

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
          {flight.duration && (
            <>
              <br />
              ⏱️ Duration: {flight.duration} min
            </>
          )}
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
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (e.g. +25261XXXXXXX or 0025261XXXXXXX)"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {phoneError && (
            <p className="text-red-600 text-sm mt-1">{phoneError}</p>
          )}
        </div>
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
