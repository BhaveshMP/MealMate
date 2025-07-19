"use client";
import { useEffect, useState } from "react";
import { getData } from "../components/backend/Backend"; // Adjust if your path is different
import { Card } from "flowbite-react";

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getData("menu");
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Menu Items
      </h1>

      {menuItems.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card key={item.id} className="shadow-md">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-md"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{item.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                  {item.veg ? "🌿 Veg" : "🍗 Non-Veg"} | {item.available ? "Available" : "Not Available"}
                </p>
                {item.specialDish && (
                  <span className="inline-block mt-2 text-sm px-2 py-1 bg-yellow-300 text-yellow-800 rounded-full">
                    ⭐ Special Dish
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuList;
