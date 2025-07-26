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
    <div className='flex flex-row gap-2 flex-wrap'>
        {data.map((item)=>(
<div className="max-w-sm overflow-hidden shadow-lg group h-[400px] relative p-0">
  {/* IMAGE */}
  <div className="w-full h-full">

    {item.imageUrl ? (
      <img
        src={item.imageUrl}
        alt={item.name || "dish"}
        className="w-full h-full object-cover"
      />
    ) : (

        <img
          src="/notFound.jpg"
          alt={item.name || "dish"}
          className="w-full h-full object-fill"
        />
    )}
  </div>

  {/* OVERLAY ON IMAGE */}
  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-4 py-3">
    {/* Always visible: name & price */}
    <div className="flex justify-between items-center text-sm font-semibold">
      <span className="truncate">{item.name || "Unnamed Dish"}</span>
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

  {/* BADGES - on bottom left corner of image */}
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
