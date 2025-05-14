// pages/AdminLayout.jsx
import { Link, Outlet, useLocation } from "react-router-dom";

export const AdminLayout = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          <Link
            to="/admin"
            className={`block px-3 py-2 rounded hover:bg-gray-700 ${
              isActive("/admin") &&
              !location.pathname.includes("addflights") &&
              "bg-gray-800"
            }`}
          >
            All Bookings
          </Link>
          <Link
            to="/adminlayout/addflights"
            className={`block px-3 py-2 rounded hover:bg-gray-700 ${
              isActive("addflights") && "bg-gray-800"
            }`}
          >
            Add Flights
          </Link>
          <Link
            to="/admin/booking"
            className={`block px-3 py-2 rounded hover:bg-gray-700 ${
              isActive("booking") && "bg-gray-800"
            }`}
          >
            Booking Page
          </Link>
          <Link
            to="/admin/payment-failed"
            className={`block px-3 py-2 rounded hover:bg-gray-700 ${
              isActive("payment-failed") && "bg-gray-800"
            }`}
          >
            Payment Failed
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-grow p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};
