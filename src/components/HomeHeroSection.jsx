"use client";
import React from "react";

export default function HomeHeroSection() {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col justify-center items-start px-8 md:px-24"
      style={{
        backgroundImage:
          "url('public/bg1.png')", // Replace with your own background
      }}
    >
      <div className="max-w-xl">
        <h1 className="text-7xl md:text-6xl font-extrabold leading-tight mb-4">
          Fresh. Fast. <br /> Affordable.
        </h1>
        <p className="text-xl md:text-2xl mb-6">
          CANTEEN SERVICES <br /> FOR OFFICES
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow-lg transition">
          Order Now
        </button>
      </div>
    </div>
  );
}
