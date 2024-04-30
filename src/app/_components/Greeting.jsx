"use client";
import React, { useState, useEffect } from "react";
import format from "date-fns/format";

const Greeting = () => {
  const [name, setName] = useState("User");
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = format(new Date(), "PPPP");
    setDate(today);
  }, []);

  return (
    <div className="absolute top-0 left-0 p-5">
      <h1 className="text-lg font-light text-black">Hello {name}</h1>
      <p className="text-sm font-normal pb-2 text-black">{date}</p>
      <p className="text-sm italic text-gray-600">
        This is a place for your inspirational quote.
      </p>
      <p className="text-sm text-gray-600">Author</p>
    </div>
  );
};

export default Greeting;
