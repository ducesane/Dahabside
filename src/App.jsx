import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button";

import { Route, Routes } from "react-router-dom";
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
import { AuthProvider } from "./context/AuthContext";
import UnAuthenticatedRoutes from "./components/UnAuthenticatedRoutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <div className=" ">
        <Header />
        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="admin" element={<Admin />} />
            <Route path="booking" element={<Booking />} />
            <Route path="booking/:booking-id" element={<Booking />} />
            <Route path="payment" element={<Payment />} />
            <Route path="passenger" element={<Passenger />} />
            <Route path="payment-failed" element={<PaymentFailed />} />

            {/* Un Authenticates routes (redirect  to home if logged in ) */}
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
