import React, { useEffect, useState } from "react";
import supabase from "../lib/supabase";

export const Admin = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
          *,
          flights (
            airplanes(name),
            from_city:cities!flights_from_city_id_fkey(name, code),
            to_city:cities!flights_to_city_id_fkey(name, code)
          )
        `
        )
        .order("created_at", { ascending: false });

      if (!error) setBookings(data || []);
    };

    fetchBookings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">All Bookings</h2>

      <div className="overflow-auto">
        <table className="w-full table-auto text-sm text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Passenger</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Route</th>
              <th className="px-4 py-2">Airline</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="px-4 py-2">{b.passenger_name}</td>
                <td className="px-4 py-2">
                  {b.email}
                  <br />
                  {b.phone}
                </td>
                <td className="px-4 py-2">
                  {b.flights.from_city.name} → {b.flights.to_city.name}
                </td>
                <td className="px-4 py-2">{b.flights.airplanes.name}</td>
                <td className="px-4 py-2 text-green-600">{b.status}</td>
                <td className="px-4 py-2">
                  {new Date(b.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
