import { signup } from "@/lib/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
  const [email, setemail] = useState("");
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setisLoading] = useState(false);
  const [isSucces, setIsSuccess] = useState("");
  const [error, setError] = useState("");

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, fullname);

    setisLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("password iyo cofirmpassword waa in aya is lahaadaan");
      console.log(error);
      setisLoading(false);
      return;
    }

    try {
      await signup(email, fullname, username, password);
    } catch (error) {
      setError("Signup failed: " + error.message);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-300 px-4">
      <div className="w-full max-w-[600px]  bg-white shadow p-8 rounded-md my-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create account
        </h2>

        <form className="space-y-4" onSubmit={HandleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Full name
            </label>
            <input
              type="text"
              placeholder="Full name"
              className="mt-1 w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="mt-1 w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="mt-1 w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Password
            </label>
            <input
              type="password"
              placeholder="*************"
              className="mt-1 w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Confirm password
            </label>
            <input
              type="password"
              placeholder="*************"
              className="mt-1 w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // <-- FIXED HERE!
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Signing Up ...." : "Sign up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
