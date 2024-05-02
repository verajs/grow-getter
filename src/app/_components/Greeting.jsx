"use client";
import React, { useState, useEffect } from "react";
import format from "date-fns/format";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/router"; 
import axios from "axios"; 
import { RiLogoutBoxRFill } from "react-icons/ri";


const Greeting = () => {
  const { user, logout } = useAuth();
  const router = useRouter(); 
  const [name, setName] = useState("User");
  const [date, setDate] = useState("");
  const [quote, setQuote] = useState(""); 
  const [author, setAuthor] = useState(""); 
  useEffect(() => {
    if (!user) {
     
      router.push("/auth"); 
    } else if (user.name) {
      setName(user.name); 
    }
    axios
      .get("https://api.quotable.io/random")
      .then((response) => {
        setQuote(response.data.content);
        setAuthor(response.data.author); 
      })
      .catch((error) => console.error("Error fetching quote:", error));

    const today = format(new Date(), "PPPP");
    setDate(today);
  }, [user, router]); 

  
  if (!user) return null;
  return (
    <div>
      <button
        onClick={logout} 
        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-2xl cursor-pointer text-green-800 bg-white rounded-full shadow-lg transition-colors"
        style={{ zIndex: 1 }}
      >
        <RiLogoutBoxRFill />
      </button>
      <div className="absolute top-0 left-0 p-5">
        <h1 className="text-3xl text-bold text-black">Hello {name}</h1>
        <p className="text-lg font-normal pb-8 text-black">{date}</p>
        <p className="text-lg italic text-gray-600">{quote} </p>
        <p className="text-lg text-gray-600">{author}</p>
      </div>
    </div>
  );
};

export default Greeting;
