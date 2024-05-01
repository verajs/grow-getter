"use client";
import Image from "next/image";
import Greeting from "../../app/_components/Greeting";
import { LuListTodo } from "react-icons/lu";
import "../../app/globals.css";
import { useState, useEffect } from "react";
import Overlay from "@/components/Overlay";
export default function Home() {
  const [showOverlay, setShowOverlay] = useState(false);

  const openOverlay = () => {
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <div className="relative w-full h-screen bg-[#f4e9da] flex items-end justify-center">
      {/* Circle positioned behind everything else with a lower z-index */}
      {/* <div className="absolute bottom-0 inset-0 mx-qu overflow-hidden z-0">
        <div className="w-[50vw] h-[50vw] max-w-[60%] max-h-[60%] bg-white rounded-full"></div>
      </div> */}

      <div className="w-1/4 max-w-[300px] z-10">
        <Image
          src="/plant1.png"
          layout="responsive"
          width={100}
          height={100}
          objectFit="contain"
          alt="Plant Image"
        />
      </div>
      <Greeting />
      <div className="absolute bottom-5 right-5 flex flex-col items-center space-y-3">
        <button
          className="w-12 h-12 text-2xl cursor-pointer text-green-600 bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
          onClick={openOverlay}
        >
          <LuListTodo />
        </button>
        <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md">
          <span className="text-sm text-green-600 font-semibold">1/5</span>
        </div>
      </div>
      <Overlay onClose={closeOverlay} show={showOverlay} />
    </div>
  );
}
