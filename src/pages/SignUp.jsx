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
  const [isSucces, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, fullname);

    setisLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      console.log(error);
      setisLoading(false);
      return;
    }

    try {
      await signup(email, fullname, username, password);
      setIsSuccess(true);
      console.log("cinwaanka waala sameyay");
    } catch (error) {
      setError("Signup failed: " + error.message);
      alert(error);
    } finally {
      setisLoading(false);
    }
  };
  if (isSucces) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
            <p className="text-gray-600 mb-4">
              Your account has been created successfully. Please check your
              email for verification.
            </p>
            <p className="text-gray-500 text-sm">
              Redirecting to sign in page in a few seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-[600px]  bg-white shadow p-8 rounded-md my-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create account
        </h2>
        {error && (
          <h2 className="text-1xl font-bold text-red-800 text-center mb-6">
            {error}
          </h2>
        )}
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
              autoComplete="username"
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
              autoComplete="email"
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
              autoComplete="password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Confirm password
            </label>
            <input
              type="password"
              autoComplete="password"
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
