import axios from "axios";
import React, { useState } from "react";

const RegisterForm = ({ onRegistrationSuccess }) => {
  const [error, setError] = useState("");

  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());
    setError(""); 

    try {
      const response = await axios.post(
        "https://sellermation.com/users/",
        userData
      );
      console.log("Registration Successful:", response.data);
      setIsSuccessful(true); 
      setTimeout(() => {
        onRegistrationSuccess(userData); 
      }, 2000); 
    } catch (error) {
      if (error.response) {
        setError(`Registration failed: ${error.response.data.detail}`);
        console.error("Registration failed:", error.response.data);
      } else if (error.request) {
        setError("No response from server. Check your connection.");
        console.error("No response from server:", error.request);
      } else {
        setError(`Error: ${error.message}`);
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm text-gray-500">
            Name(s)
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Sebastian Vera"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="mt-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm text-gray-500"
          >
            Choose your username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="sebastianvera123"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="mt-6">
          <label htmlFor="email" className="block mb-2 text-sm text-gray-500">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@example.com"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="mt-6">
          <label htmlFor="password" className="text-sm text-gray-500">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="mt-6">
          {error && <p className="text-black">{error}</p>}
          {isSuccessful && (
            <div className="text-black  py-4">Registration successful!</div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:bg-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50 transition-colors duration-200 transform"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
