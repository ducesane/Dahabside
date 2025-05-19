import { useAuth } from "@/Context/AuthContext";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ProtectedRoutes } from "@/components/ProtectedRoutes"; // Import ProtectedRoutes

export const AdminLayout = () => {
  const location = useLocation();
  const { user, isLoggedIn, logOut, profile } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname.includes(path);

  useEffect(() => {
    console.log("Current User:", user); // Make sure it shows the logged-in user details
  }, [user]);

  return (
    <ProtectedRoutes>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "block" : "hidden"
          }  lg:block w-64 bg-gray-900 text-white p-6 space-y-4 transition-all duration-300`}
        >
          <h2 className="text-xl font-bold mb-4 bg-red">Admin Panel</h2>
          <nav className="space-y-2">
            <Link
              to="/adminlayout"
              className={`block px-3 py-2 rounded hover:bg-gray-700 ${
                isActive("adminlayout") &&
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
              to="/adminlayout/flights"
              className={`block px-3 py-2 rounded hover:bg-gray-700 ${
                isActive("flights") && "bg-gray-800"
              }`}
            >
              All Flights
            </Link>

            <Link
              to="/adminlayout/FlightSearchAndEdit"
              className={`block px-3 py-2 rounded hover:bg-gray-700 ${
                isActive("FlightSearchAndEdit") && "bg-gray-800"
              }`}
            >
              FlightSearch And Edit
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-grow p-6 bg-gray-50">
          <Outlet />
        </main>

        {/* Mobile Sidebar Toggle Button */}
        <button
          className="lg:hidden p-1 text-white bg-gray-900 fixed top-16 left-0 z-50"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <span className="text-xl p-2 ">☰</span>
        </button>
      </div>
    </ProtectedRoutes>
  );
};
