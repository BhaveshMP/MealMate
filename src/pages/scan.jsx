import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import beep from "../assets/beep.m4a";

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

    const onScanSuccess = (decodedText, decodedResult) => {
      if (isScanned) return; // Prevent multiple scans
      setIsScanned(true);

      // ✅ Play success sound
      const audio = new Audio(beep);
      audio.play();

      // ✅ Show success alert
      alert(`✅ Scan successful!\nData: ${decodedText}`);

      // ✅ Stop scanner
      scannerRef.current.clear().catch((error) => {
        console.error("Scanner cleanup error:", error);
      });
    };

    const onScanFailure = (error) => {
      // console.warn("Scan failure:", error); // optional
    };

    // ✅ Start scanning
    scannerRef.current.render(onScanSuccess, onScanFailure);

    // ✅ Cleanup scanner on unmount
    return () => {
      scannerRef.current?.clear().catch((error) => {
        console.error("Error clearing scanner on unmount:", error);
      });
    };
  }, [isScanned]);

  return (
    <div style={{ textAlign: "center", marginTop: "10rem" }}>
      <h2>📷 Scan Your Meal Coupon</h2>
      <div id="reader" ref={readerRef} style={{ width: "300px", margin: "auto" }}></div>
    </div>
  );
};

export default Scan;
