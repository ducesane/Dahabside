import React, { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [groupBy, setGroupBy] = useState("date");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [airlineFilter, setAirlineFilter] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          flights (
            price,
            direction,
            airplanes(name),
            from_city:cities!flights_from_city_id_fkey(name, code),
            to_city:cities!flights_to_city_id_fkey(name, code)
          )
        `)
        .order("flight_date", { ascending: true });

      if (data) {
        setBookings(data);
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  const filtered = bookings.filter((b) => {
    const matchDate = selectedDate
      ? b.flight_date &&
      new Date(b.flight_date).toISOString().split("T")[0] ===
      selectedDate.toISOString().split("T")[0]
      : true;

    const matchSearch = searchTerm
      ? b.passenger_name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchAirline = airlineFilter
      ? b.flights?.airplanes?.name?.toLowerCase().includes(airlineFilter.toLowerCase())
      : true;
    const matchDestination = destinationFilter
      ? b.flights?.to_city?.name?.toLowerCase().includes(destinationFilter.toLowerCase())
      : true;
    return matchDate && matchSearch && matchAirline && matchDestination;
  });

  const grouped = filtered.reduce((acc, booking) => {
    const key =
      groupBy === "route"
        ? `${booking.flights?.from_city?.name} → ${booking.flights?.to_city?.name}`
        : booking.flight_date || "Unknown";

    if (!acc[key]) acc[key] = { items: [], total: 0 };
    acc[key].items.push(booking);
    acc[key].total += booking.flights?.price || 0;
    return acc;
  }, {});

  const paginatedGroups = Object.entries(grouped).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(Object.keys(grouped).length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Admin Bookings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-sm font-semibold block mb-1">Search by Passenger:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter name..."
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1">Filter by Airline:</label>
          <input
            type="text"
            value={airlineFilter}
            onChange={(e) => setAirlineFilter(e.target.value)}
            placeholder="Airline name..."
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1">Filter by Destination:</label>
          <input
            type="text"
            value={destinationFilter}
            onChange={(e) => setDestinationFilter(e.target.value)}
            placeholder="To city..."
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1">Flight Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setCurrentPage(1);
            }}
            className="border px-3 py-2 rounded w-full"
            placeholderText="Select a date"
            dateFormat="yyyy-MM-dd"
            isClearable
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="text-sm font-semibold block mb-1">Group By:</label>
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="date">Flight Date</option>
          <option value="route">Flight Route</option>
        </select>
      </div>

      {loading ? (
        <p>Loading bookings...</p>
      ) : paginatedGroups.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        paginatedGroups.map(([key, group]) => (
          <div key={key} className="mb-10">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {groupBy === "date"
                ? new Date(key).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
                : key}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Total Bookings: {group.items.length} | Revenue: ${group.total}
            </p>
            <div className="overflow-auto border rounded-lg">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2">Passenger</th>
                    <th className="px-4 py-2">Contact</th>
                    <th className="px-4 py-2">Route</th>
                    <th className="px-4 py-2">Airline</th>
                    <th className="px-4 py-2">Day</th>
                    <th className="px-4 py-2">Direction</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Booked At</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((b) => (
                    <tr key={b.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{b.passenger_name}</td>
                      <td className="px-4 py-2">
                        {b.email}
                        <br />
                        {b.phone}
                      </td>
                      <td className="px-4 py-2">
                        {b.flights?.from_city?.name} → {b.flights?.to_city?.name}
                      </td>
                      <td className="px-4 py-2">{b.flights?.airplanes?.name}</td>
                      <td className="px-4 py-2">{b.flight_day}</td>
                      <td className="px-4 py-2">{b.flights?.direction}</td>
                      <td className="px-4 py-2">${b.flights?.price}</td>
                      <td className="px-4 py-2">
                        {new Date(b.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : ""
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
