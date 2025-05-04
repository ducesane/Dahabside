import { signIn } from "@/lib/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignIn = () => {

      const [email, setemail] = useState("");
       
     const [password, setpassword] = useState("");
     
      const [loading, setisLoading] = useState(false);
      const [isSucces, setIsSuccess] = useState(false);
      const [error, setError] = useState("");

      const nagivate = useNavigate();

      const HandleSubmit = async (e) => {
        e.preventDefault();
        console.log('submited', email, password)
        setisLoading(true)
        setError("");

        try {
          await signIn(email, password) 
          setIsSuccess(true);
          nagivate("/");
        console.log("loggin in success");

          
        } catch (error) {
          setError('sign in failed', error.message)
          
        }finally{
          setisLoading(false);
        }
        
      }
  
  return (
    <div className="max-h-screen flex bg-gray-50 items justify-center ">
      {/* Left Image Section */}
      {/* <div className="w-1/2 hidden md:block">
        <img
          src=" https://images.unsplash.com/photo-1561105109-34a3ff1eee63?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="object-cover w-full h-full"
          alt="sign up"
        />
      </div> */}
      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 m-4 bg-white">
        <div className="w-full max-w-md space-y-6  ">
          <h2 className="text-3xl font-bold text-gray-800 ">Sign in</h2>
          <form className="space-y-4" onSubmit={HandleSubmit}>
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-800"
              >
                email
              </label>
              <input
                type="email"
                placeholder="User name"
                className="mt-1 w-full py-2 px-4 border rounded-md focus:outlin-none focus:ring-2 focus:ring-blue-500 "
                value={email}
                onChange={(e) => setemail(e.target.value)}
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
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {
                loading ? 'sigining...' : 'signin'
              }
            </button>
          </form>
          <p className="text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
