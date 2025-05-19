import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button";

import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";
import { Booking } from "./pages/Booking";
import { Payment } from "./pages/Payment";
import { Passenger } from "./pages/Passenger";
import { PaymentFailed } from "./pages/PaymentFailed";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AuthProvider } from "@/Context/AuthContext";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { UnAuthenticatedRoutes } from "./components/UnAuthenticatedRoutes";

import { AddFlights } from "./pages/AddFlights";
import { FlightSearchAndEdit } from "./pages/FlightSearchAndEdit";
import { SearchResults } from "./pages/SearchResults";
import { AdminLayout } from "./pages/AdminLayout";
import { Flights } from "./pages/Flights";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="payment" element={<Payment />} />
            <Route path="passenger" element={<Passenger />} />
            <Route path="searchresults" element={<SearchResults />} />
            <Route path="booking/:booking-id" element={<Booking />} />
            <Route path="booking" element={<Booking />} />

            {/* Auth-protected layout with nested admin pages */}
            <Route
              path="*"
              element={
                <ProtectedRoutes>
                  <AdminLayout />
                </ProtectedRoutes>
              }
            />
            <Route path="adminlayout" element={<AdminLayout />}>
              <Route index element={<Admin />} /> {/* default: /adminlayout */}
              <Route path="addflights" element={<AddFlights />} />
              <Route path="payment-failed" element={<PaymentFailed />} />
              <Route path="flights" element={<Flights />} />
              <Route
                path="FlightSearchAndEdit"
                element={<FlightSearchAndEdit />}
              />
              {/* Optional: fallback or redirect */}
            </Route>

            {/* Auth-restricted routes (sign in/up) */}
            <Route
              path="/signin"
              element={
                <UnAuthenticatedRoutes>
                  <SignIn />
                </UnAuthenticatedRoutes>
              }
            />
            <Route
              path="/signup"
              element={
                <UnAuthenticatedRoutes>
                  <SignUp />
                </UnAuthenticatedRoutes>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
