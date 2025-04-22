import React from "react";

export const SignUp = () => {
  return (
    <div className="max-h-screen flex">
      {/* Left Image Section */}
      <div className="w-1/2 hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1650399470902-0dd9259b91c6?q=80&w=1384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="object-cover w-full h-full"
          alt="sign up"
        />
      </div>
      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6  ">
          <h2 className="text-3xl font-bold text-gray-800 ">Create account</h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-800"
              >
                Full name{" "}
              </label>
              <input
                type="text"
                placeholder="Full name"
                className="mt-1 w-full py-2 px-4 border rounded-md focus:outlin-none focus:ring-2 focus:ring-blue-500 "
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-800"
              >
                User name
              </label>
              <input
                type="text"
                placeholder="User name"
                className="mt-1 w-full py-2 px-4 border rounded-md focus:outlin-none focus:ring-2 focus:ring-blue-500 "
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="*************"
                className="mt-1 w-full py-2 px-4 border rounded-md focus:outlin-none focus:ring-2 focus:ring-blue-500 "
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
