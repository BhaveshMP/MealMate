import { Card } from "flowbite-react";
import { QRCodeCanvas } from "qrcode.react";

function Coupon() {
  const employeeId = "EMP123";


  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const snacksCode = JSON.stringify({ type: "snacks", date: formattedDate, employeeId });
  const mealCode = JSON.stringify({ type: "meal", date: formattedDate, employeeId });

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center mt-10">
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
        </div>
      </Card>
    </div>
  );
}

export default Coupon;
