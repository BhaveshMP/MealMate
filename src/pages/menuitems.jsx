"use client";
import { useState, useEffect, useRef } from "react";
import { Card, Button } from "flowbite-react";
import { QRCodeCanvas } from "qrcode.react";
import { Html5QrcodeScanner } from "html5-qrcode";
import beep from "../assets/beep.m4a";
import { getData } from "../components/backend/Backend";

const CafeteriaPortal = () => {
  const [viewMode, setViewMode] = useState("menu"); // "menu" or "scan"
  const [menuItems, setMenuItems] = useState([]);
  const readerRef = useRef(null);
  const scannerRef = useRef(null);
  const [isScanned, setIsScanned] = useState(false);

const user = JSON.parse(sessionStorage.getItem("activeUser") || "{}");
const employeeId = user.id;  // will be "emp789" here

  // Fetch menu
  useEffect(() => {
    if (viewMode !== "menu") return;

    const fetchMenu = async () => {
      try {
        const data = await getData("menu");
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, [viewMode]);

  // Setup scanner
  useEffect(() => {
    if (viewMode !== "scan" || !readerRef.current) return;

    scannerRef.current = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });

    const onScanSuccess = (decodedText) => {
      if (isScanned) return;
      setIsScanned(true);
      new Audio(beep).play();
      alert(`✅ Scan successful!\n\nData: ${decodedText}`);
      scannerRef.current.clear().catch(console.error);
    };

    scannerRef.current.render(onScanSuccess, () => {});

    return () => {
      scannerRef.current?.clear().catch(console.error);
    };
  }, [viewMode, isScanned]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">🍽️ Cafeteria Portal</h1>
        <div className="mt-4 space-x-4">
          <Button onClick={() => setViewMode("menu")} color="purple">
            📋 Menu
          </Button>
          <Button
            onClick={() => {
              setIsScanned(false);
              setViewMode("scan");
            }}
            color="green"
          >
            📷 Scan
          </Button>
        </div>
      </div>

      {/* Menu View */}
      {viewMode === "menu" && (
        <div>
          {menuItems.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300">Loading menu...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {menuItems.map((item) => {
                const today = new Date();
                const day = String(today.getDate()).padStart(2, "0");
                const month = String(today.getMonth() + 1).padStart(2, "0");
                const year = today.getFullYear();
                const formattedDate = `${day}/${month}/${year}`;

                const qrData = JSON.stringify({
                  type: item.veg ? "veg" : "non-veg",
                  itemName: item.name,
                  date: formattedDate
                });

                return (
                  <Card key={item.id} className="shadow-md">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-t-md"
                      />
                    )}
                    <div className="p-4 flex flex-col items-center">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{item.name}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                      <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                        {item.veg ? "🌿 Veg" : "🍗 Non-Veg"} |{" "}
                        {item.available ? "Available" : "Not Available"}
                      </p>
                      {item.specialDish && (
                        <span className="inline-block mt-2 text-sm px-2 py-1 bg-yellow-300 text-yellow-800 rounded-full">
                          ⭐ Special Dish
                        </span>
                      )}
                      <div className="mt-4">
                        <QRCodeCanvas value={qrData} size={100} />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Scan View */}
      {viewMode === "scan" && (
        <div className="mt-10 text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            📷 Scan Your Coupon QR Code
          </h2>
          <div id="reader" ref={readerRef} style={{ width: "300px", margin: "auto" }}></div>
        </div>
      )}
    </div>
  );
};

export default CafeteriaPortal;