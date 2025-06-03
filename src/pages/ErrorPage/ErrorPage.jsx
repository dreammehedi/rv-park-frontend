import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-green-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative SVG Wave */}
      <svg
        className="absolute top-0 left-0 w-full  opacity-10"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#4CAF50" // Changed wave color to a lighter green
          fillOpacity="1"
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>

      <div className="text-center relative z-10">
        {/* 404 Heading without Animation */}
        <h1 className="text-9xl md:text-[12rem] font-bold text-green-800 mb-4">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Oops! Page Not Found
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track!
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="inline-block bg-yellow-500 text-white px-6 py-3 shadow-lg hover:bg-yellow-600 hover:scale-105 transform transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
