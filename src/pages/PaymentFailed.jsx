import React from "react";
import { useNavigate } from "react-router-dom";

export const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-20 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-2">
        Payment Failed ❌
      </h2>
      <p className="mb-4">
        Something went wrong while processing your booking.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Back to Home
      </button>
    </div>
  );
};
