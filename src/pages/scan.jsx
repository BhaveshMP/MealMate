import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import beep from "../assets/beep.m4a";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { insertData } from "@/components/backend/Backend";

const Scan = () => {

  const scannerRef = useRef(null);
  const readerRef = useRef(null);
  const [isScanned, setIsScanned] = useState(false);

  useEffect(() => {
    if (!readerRef.current) return;

    scannerRef.current = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250
    });

    const onScanSuccess = async(decodedText) => {
      if (isScanned) return;

      try {
        const data = JSON.parse(decodedText);
        const date = new Date()
        const today = date.toISOString().split("T")[0]; // "YYYY-MM-DD"

        if (data.date !== today) {
          toast.error("❌ QR is from a different date!");
          return;
        }

        setIsScanned(true);
        new Audio(beep).play();
        toast.success(`✅ QR Verified for ${data.employeeId} (${data.type.toUpperCase()})`);
        console.log(data)
        const fetch = await insertData("coupon",data)

        scannerRef.current.clear().catch((error) => {
          console.error("Scanner cleanup error:", error);
        });
      } catch (e) {
        toast.error("❌ Invalid QR Code!",e);
        console.log(e)
      }
    };

    scannerRef.current.render(onScanSuccess, () => {});

    return () => {
      scannerRef.current?.clear().catch((error) => {
        console.error("Scanner cleanup error:", error);
      });
    };
  }, [isScanned]);

  return (
    <div style={{ textAlign: "center", marginTop: "10rem" }}>
      <ToastContainer />
      <h2>📷 Scan Your Meal/Snacks Coupon</h2>
      <div id="reader" ref={readerRef} style={{ width: "300px", margin: "auto" }}></div>
    </div>
  );
};

export default Scan;
