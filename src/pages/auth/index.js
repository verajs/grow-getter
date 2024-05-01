import Image from "next/image";
import "../../app/globals.css";
import React, { useState } from "react";

import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
const AuthForm = () => {
  const [isRegistering, setIsRegistering] = useState(true);

  // Function to switch to login
  const handleRegistrationSuccess = () => {
    setIsRegistering(false);
  };
  return (
    <div className="bg-[white] font-fredoka">
      <div className="flex justify-center h-screen">
        <div className="hidden bg-[#f4e9da] z-40 lg:flex lg:w-1/2 justify-center items-center">
          <Image
            src="/logopromo.webp"
            layout="fixed"
            width={400} // Increased size
            height={400} // Maintain aspect ratio
            alt="Promo Image"
            className="bg-[#f4e9da]" // White background
          />
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <Image
                src="/growgetterlogo.png"
                layout="responsive"
                width={100}
                height={100}
                alt="Plant Image"
              />
              <p className="mt-3 text-white">
                {isRegistering ? "Start growing now!" : "Welcome back!"}
              </p>
            </div>
            {isRegistering ? (
              <RegisterForm onRegistrationSuccess={handleRegistrationSuccess} />
            ) : (
              <LoginForm />
            )}
            <div className="mt-4 text-center">
              {isRegistering ? (
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsRegistering(false)}
                    className="text-green-500 focus:outline-none focus:underline hover:underline"
                  >
                    Log In
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-400">
                  Don’t have an account yet?{" "}
                  <button
                    onClick={() => setIsRegistering(true)}
                    className="text-green-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
