"use client";
import { Carousel } from "flowbite-react";

export default function CarouselComponent() {
  return (
    <div className="w-full min-h-screen px-4 py-8 bg-gray-50">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        {/* Left Side - Text */}
        <div className="w-full md:w-1/2 text-left space-y-6 px-2 md:px-6">
          <h2 className="text-4xl font-bold text-gray-800">
            Welcome to Our Office Canteen
          </h2>
          <p className="text-lg text-gray-600">
            Enjoy freshly prepared meals that are fast, delicious, and
            affordable. Whether it's a quick lunch or a full catering service,
            our canteen is here to serve your team with quality and taste.
          </p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow-lg transition">
            Explore Menu
          </button>
        </div>

        {/* Right Side - Carousel */}
        <div className="w-full md:w-1/2 h-64 md:h-[400px] rounded-xl overflow-hidden shadow-xl border border-gray-200">
          <Carousel
            slideInterval={4000}
            indicators={true}
            leftControl="‹"
            rightControl="›"
          >
            {["G1.png", "G2.png", "G3.png", "G4.png", "G5.png"].map((img, i) => (
              <img
                key={i}
                src={`/${img}`}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-contain transition-all duration-700 ease-in-out"
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
