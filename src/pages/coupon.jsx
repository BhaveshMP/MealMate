import { useState, useEffect, useRef } from "react";
import { Card, Button } from "flowbite-react";
import { QRCodeCanvas } from "qrcode.react";
import { Html5QrcodeScanner } from "html5-qrcode";
import beep from "../assets/beep.m4a"; // adjust path if needed

const CouponAndScan = () => {
  const [viewMode, setViewMode] = useState("generate"); // "generate" or "scan"
  const scannerRef = useRef(null);
  const readerRef = useRef(null);
  const [isScanned, setIsScanned] = useState(false);

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const snacksCode = JSON.stringify({ type: "snacks", date: formattedDate, employeeId });
  const mealCode = JSON.stringify({ type: "meal", date: formattedDate, employeeId });

  // Setup QR Scanner
  useEffect(() => {
    if (viewMode !== "scan" || !readerRef.current) return;

    scannerRef.current = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });

    const onScanSuccess = (decodedText, decodedResult) => {
      if (isScanned) return;
      setIsScanned(true);
      new Audio(beep).play();
      alert(`✅ Scan successful!\nData: ${decodedText}`);
      scannerRef.current.clear().catch((err) => console.error("Scanner cleanup error:", err));
    };

    scannerRef.current.render(onScanSuccess, () => {});

    return () => {
      scannerRef.current?.clear().catch((err) =>
        console.error("Error clearing scanner on unmount:", err)
      );
    };
  }, [viewMode, isScanned]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">🍱 Meal & Snacks Coupon</h1>
        <div className="mt-4 space-x-4">
          <Button onClick={() => setViewMode("generate")} color="blue">
            🎫 Generate Coupon
          </Button>
          <Button onClick={() => setViewMode("scan")} color="green">
            📷 Scan Coupon
          </Button>
        </div>
      </div>

      {viewMode === "generate" && (
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {/* Snacks Card */}
          <Card className="max-w-sm w-full flex flex-col justify-between">
            <div className="h-48 overflow-hidden">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp1s4pi1xAYPeiz_ImYY2B0ZZ7J8oeBvmwng&s"
                alt="Snacks Coupon"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center justify-between flex-grow p-4">
              <h5 className="text-2xl font-bold">SNACKS</h5>
              <p className="text-gray-700">Date: {formattedDate}</p>
              <QRCodeCanvas value={snacksCode} size={100} className="mt-4" />
            </div>
          </Card>

          {/* Meal Card */}
          <Card className="max-w-sm w-full flex flex-col justify-between">
            <div className="h-48 overflow-hidden">
              <img
                src="https://thumbs.dreamstime.com/b/indian-vegetarian-meal-23223806.jpg"
                alt="Meal Coupon"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center justify-between flex-grow p-4">
              <h5 className="text-2xl font-bold">MEAL</h5>
              <p className="text-gray-700">Date: {formattedDate}</p>
              <QRCodeCanvas value={mealCode} size={100} className="mt-4" />
            </div>
          </Card>
        </div>
      )}

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

export default CouponAndScan;