import React, { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [airlineFilter, setAirlineFilter] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchBookings = async () => {
      const { data } = await supabase
        .from("bookings")
        .select(
          `
          *,
          flights (
            price,
            direction,
            airplanes(name),
            from_city:cities!flights_from_city_id_fkey(name, code),
            to_city:cities!flights_to_city_id_fkey(name, code)
          )
        `
        )
        .order("flight_date", { ascending: true });

      if (data) setBookings(data);
    };
    fetchBookings();
  }, []);

  const filtered = bookings
    .filter((b) => {
      const bookedDate = b.created_at ? new Date(b.created_at) : null;

      const matchDateRange =
        (!startDate || (bookedDate && bookedDate >= startDate)) &&
        (!endDate || (bookedDate && bookedDate <= endDate));

      const matchSearch = searchTerm
        ? b.passenger_name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchAirline = airlineFilter
        ? b.flights?.airplanes?.name
            ?.toLowerCase()
            .includes(airlineFilter.toLowerCase())
        : true;

      const matchDestination = destinationFilter
        ? b.flights?.to_city?.name
            ?.toLowerCase()
            .includes(destinationFilter.toLowerCase())
        : true;

      return matchDateRange && matchSearch && matchAirline && matchDestination;
    })
    .sort((a, b) => {
      const dateA = new Date(a.flight_date);
      const dateB = new Date(b.flight_date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Admin Bookings</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by passenger"
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="text"
          value={airlineFilter}
          onChange={(e) => setAirlineFilter(e.target.value)}
          placeholder="Filter by airline"
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="text"
          value={destinationFilter}
          onChange={(e) => setDestinationFilter(e.target.value)}
          placeholder="Filter by destination"
          className="border px-3 py-2 rounded w-full"
        />
        <div>
          <label className="text-sm font-semibold block mb-1">
            Start Date:
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setCurrentPage(1);
            }}
            className="border px-3 py-2 rounded w-full"
            placeholderText="Start date"
            dateFormat="yyyy-MM-dd"
            isClearable
          />
        </div>
        <div>
          <label className="text-sm font-semibold block mb-1">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
              setCurrentPage(1);
            }}
            className="border px-3 py-2 rounded w-full"
            placeholderText="End date"
            dateFormat="yyyy-MM-dd"
            isClearable
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Passenger</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Route</th>
              <th className="px-4 py-2">Airline</th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={toggleSortOrder}
              >
                Flight Date {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th className="px-4 py-2">Direction</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Booked At</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((b) => (
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
                <td className="px-4 py-2">{b.flight_date}</td>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : ""
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
