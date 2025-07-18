import { HiTrendingUp } from "react-icons/hi"; // Flowbite-React uses react-icons

export default function StatCard({className}) {
  const icon = <HiTrendingUp className="h-6 w-6" />;
  const label = "Monthly Revenue";
  const value = "₹48,500";
  const change = "+12% from last month";

  return (
    <div
  className={className}
>
  {/* Top: Icon (optional) */}
  <div className="flex items-center justify-start">
    <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
      {/* Replace with any icon */}
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
      </svg>
    </div>
  </div>

  {/* Bottom: Text Content */}
  <div className="text-right">
    <p className="text-sm text-gray-500">Title</p>
    <h2 className="text-xl font-bold text-gray-800">₹48,000</h2>
    <p className="text-sm text-green-600">+12% since last month</p>
  </div>
</div>


  );
}
