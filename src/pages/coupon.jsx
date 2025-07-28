import { Card } from "flowbite-react";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Coupon() {
  const [activeUser, setActiveUser] = useState(() => {
  const user = sessionStorage.getItem("activeUser");
  return user ? JSON.parse(user) : null;
});
  const employeeId = activeUser?.id;

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0]; // "YYYY-MM-DD"
  //console.log(formattedDate)


  const snacksCode = JSON.stringify({ type: "snacks", date: formattedDate, employeeId });
  const mealCode = JSON.stringify({ type: "meal", date: formattedDate, employeeId });

  const [snacksTimer, setSnacksTimer] = useState(null);
  const [mealTimer, setMealTimer] = useState(null);
  const [snacksDisabled, setSnacksDisabled] = useState(false);
  const [mealDisabled, setMealDisabled] = useState(false);

  const formatCountdown = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  useEffect(() => {
    const snacksExpiry = localStorage.getItem("snacksExpiry");
    const mealExpiry = localStorage.getItem("mealExpiry");

    if (snacksExpiry && new Date() < new Date(snacksExpiry)) {
      const secondsLeft = Math.floor((new Date(snacksExpiry) - new Date()) / 1000);
      setSnacksDisabled(true);
      setSnacksTimer(secondsLeft);
    }

    if (mealExpiry && new Date() < new Date(mealExpiry)) {
      const secondsLeft = Math.floor((new Date(mealExpiry) - new Date()) / 1000);
      setMealDisabled(true);
      setMealTimer(secondsLeft);
    }
  }, []);

  useEffect(() => {
    let snacksInterval, mealInterval;

    if (snacksDisabled && snacksTimer > 0) {
      snacksInterval = setInterval(() => {
        setSnacksTimer((prev) => {
          if (prev <= 1) {
            clearInterval(snacksInterval);
            setSnacksDisabled(false);
            localStorage.removeItem("snacksExpiry");
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }

    if (mealDisabled && mealTimer > 0) {
      mealInterval = setInterval(() => {
        setMealTimer((prev) => {
          if (prev <= 1) {
            clearInterval(mealInterval);
            setMealDisabled(false);
            localStorage.removeItem("mealExpiry");
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(snacksInterval);
      clearInterval(mealInterval);
    };
  }, [snacksTimer, mealTimer]);

  const handleGenerate = (type) => {
    const now = new Date();
    const expiry = new Date(now.getTime() + 12 * 60 * 60 * 1000); // 12 hours

    if (type === "snacks") {
      localStorage.setItem("snacksExpiry", expiry);
      setSnacksDisabled(true);
      setSnacksTimer(12 * 60 * 60);
      toast.success("✅ Snacks QR generated successfully!");
    } else if (type === "meal") {
      localStorage.setItem("mealExpiry", expiry);
      setMealDisabled(true);
      setMealTimer(12 * 60 * 60);
      toast.success("✅ Meal QR generated successfully!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center mt-10">
      <ToastContainer />

      {/* Snacks Coupon Card */}
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
          <button
            onClick={() => handleGenerate("snacks")}
            disabled={snacksDisabled}
            className={`mt-4 px-4 py-2 text-white rounded ${
              snacksDisabled ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {snacksDisabled
              ? `Wait ${formatCountdown(snacksTimer)}`
              : "Generate Snacks QR"}
          </button>
        </div>
      </Card>

      {/* Meal Coupon Card */}
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
          <button
            onClick={() => handleGenerate("meal")}
            disabled={mealDisabled}
            className={`mt-4 px-4 py-2 text-white rounded ${
              mealDisabled ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {mealDisabled
              ? `Wait ${formatCountdown(mealTimer)}`
              : "Generate Meal QR"}
          </button>
        </div>
      </Card>
    </div>
  );
}

export default Coupon;
