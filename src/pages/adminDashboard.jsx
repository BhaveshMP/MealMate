import { useState } from "react"
import SideBar from "../components/dashboard/Sidebar"
import NavbarContent from "../components/common/NavbarContent";
import { Outlet, Link } from "react-router-dom"
import DashboardBreadcrumb from "../components/dashboard/Breadcrumb"

export default function AdminDashboard(){


    const [showSidebar, setShowSidebar] = useState(true);

    return(
<>
 <NavbarContent />


  {/* Wrapper */}
  <div className="flex flex-col md:flex-row min-h-screen  border-6 border-blue-600  pt-16">

    {/* Sidebar (collapsible on small screens) */}

    <div className="hidden md:block md:fixed md:top-16 md:left-0 md:h-[90vh] md:w-64 bg-red-600 z-40 ">
  <SideBar classNam=""/>
</div>

    {/* Toggle button for small screens */}
    <div className="md:hidden flex justify-between items-center bg-red-600 p-2 ">
      <p className="text-white text-lg font-semibold">Menu</p>
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="text-white"
      >
        ☰
      </button>
    </div>

    {/* Sidebar for small screens (conditionally rendered) */}
    {showSidebar && (
      <div className="md:hidden absolute z-50 w-64 bg-red-600">
        <SideBar />
      </div>
    )}

    {/* Main Content */}
<div className="flex-1 md:ml-64">
  <DashboardBreadcrumb/>
      {/* Your main content here */}
<div className="p-4">

              <Outlet /> 
</div>
    </div>
  </div>
</>


    )
} 