"use client";

import React, { useEffect, useState } from 'react'
import { Card, Badge } from "flowbite-react";
import {getData} from "@/components/backend/Backend"

export default function MenuItems() {
    const [data, setData] = useState([]);

      useEffect(() => {
    async function fetchData() {
        const fetched = await getData("menu");
        if (Array.isArray(fetched) && fetched.length > 0) {
          setData(fetched);
        }
    }
    fetchData();
  }, []);

  return (
   <div className="flex flex-wrap gap-3">
  {data.map((item, index) => (
    <div
      key={index}
      className="relative group rounded-lg overflow-hidden shadow-md h-56" // Fixed height
      style={{ flexGrow: 1, flexBasis: "auto" }}
    >
      {/* IMAGE */}
      <img
  src={item.imageUrl || "/notFound.jpg"}
  alt={item.name || "dish"}
  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
/>


      {/* OVERLAY ON IMAGE */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-3 py-2">
        {/* Always visible: name & price */}
        <div className="flex justify-between items-center text-sm font-semibold">
          <span className="truncate max-w-[60%]">{item.name || "Unnamed Dish"}</span>
          <span>₹ {item.price ?? "0"}</span>
        </div>

        {/* Hover Description */}
        <p
          className="text-xs mt-1 opacity-0 max-h-0 overflow-hidden 
                    group-hover:opacity-100 group-hover:max-h-20 
                    transition-all duration-300 ease-in-out"
        >
          {item.description || "No description available."}
        </p>
      </div>

      {/* BADGES */}
      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
        {item.veg && <Badge color="success">Veg</Badge>}
        {item.specialDish && <Badge color="purple">Special</Badge>}
        {!item.available && <Badge color="gray">Not Available</Badge>}
      </div>
    </div>
  ))}
</div>

  )
}
