import { useRouter } from "next/router"; // Import useRouter
import { useAuth } from "./AuthContext";
import axios from "axios";
import React, { useState } from "react";

const LoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const loginData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      // Step 1: Request a token
      const response = await axios.post(
        "http://34.125.43.215:8000/token/",
        loginData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      console.log("Token received:", response.data);

      // Step 2: Check and reset todos
      const userId = response.data.user.id; // Assuming the user ID is returned here
      const checkResponse = await axios.get(
        `http://34.125.43.215:8000/users/${userId}/todos/check_reset`,
        {
          headers: { Authorization: `Bearer ${response.data.access_token}` },
        }
      );
      console.log("Todos check and reset:", checkResponse.data);

      // Step 3: Proceed with login
      login({ user: response.data.user, token: response.data.access_token });
      console.log("Login successful:", response.data.user);
      router.push("/homepage");
    } catch (error) {
      console.log("Error object:", error);
      const errorMessage = error.response
        ? `Login failed: ${
            error.response.data.detail || "Please check your credentials."
          }`
        : "Login failed: Server not responding.";
      setError(errorMessage);
      console.error(errorMessage);
    }
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit}>
        <div className="mt-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm text-gray-500"
          >
            Username
          </label>
          <input
            type="username"
            name="username"
            id="username"
            placeholder="sebas123"
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
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50"
          >
            Log In
          </button>
          <div className="text-black text-lg ">{error && <p>{error}</p>}</div>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
