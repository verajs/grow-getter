"use client";
import React, { useState, useEffect } from "react";
import format from "date-fns/format";
import { useAuth } from "./AuthContext"; // Assuming you have AuthContext set up
import { useRouter } from "next/router"; // Import useRouter for redirection
import axios from "axios"; // Import Axios
import { RiLogoutBoxRFill } from "react-icons/ri";


const Greeting = () => {
  const { user, logout } = useAuth(); // Get user from context
  const router = useRouter(); // Instantiate the router for redirection
  const [name, setName] = useState("User");
  const [date, setDate] = useState("");
  const [quote, setQuote] = useState(""); // State to hold the quote
  const [author, setAuthor] = useState(""); // State to hold the author
  useEffect(() => {
    if (!user) {
      // If there is no user in the context, redirect to login
      router.push("/auth"); // Adjust the path as needed
    } else if (user.name) {
      setName(user.name); // Set name from user context
    }
    // Fetch a random quote
    axios
      .get("https://api.quotable.io/random")
      .then((response) => {
        setQuote(response.data.content); // Set the quote text
        setAuthor(response.data.author); // Set the quote author
      })
      .catch((error) => console.error("Error fetching quote:", error));

    const today = format(new Date(), "PPPP");
    setDate(today);
  }, [user, router]); // Include router in the dependency array

  // Render nothing if there is no user
  if (!user) return null;
  return (
    <div>
      <button
        onClick={logout} // Attach logout function to button
        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-2xl cursor-pointer text-green-800 bg-white rounded-full shadow-lg transition-colors"
        style={{ zIndex: 1 }}
      >
        <RiLogoutBoxRFill />
      </button>
      <div className="absolute top-0 left-0 p-5">
        <h1 className="text-2xl font-light text-black">Hello {name}</h1>
        <p className="text-lg font-normal pb-8 text-black">{date}</p>
        <p className="text-lg italic text-gray-600">{quote} </p>
        <p className="text-lg text-gray-600">{author}</p>
      </div>
    </div>
  );
};

export default Greeting;
