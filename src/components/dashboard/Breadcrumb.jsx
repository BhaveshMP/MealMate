"use client";

import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useLocation, Link } from "react-router-dom";

// ✅ Add this mapping to avoid the error
const breadcrumbNameMap = {
  dashboard: "Dashboard",
  projects: "Projects",
  settings: "Settings",
  profile: "Profile",
  users: "Users",
  // Add more route segments as needed
};

export default function DashboardBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb
      aria-label="Solid background breadcrumb example"
      className="bg-gray-50/20 px-5 py-3 dark:bg-gray-800"
    >
      <BreadcrumbItem href="/" icon={HiHome}>
        Home
      </BreadcrumbItem>

      {pathnames.map((name, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;
        const displayName = breadcrumbNameMap[name] || name;

        return isLast ? (
          <BreadcrumbItem key={routeTo}>{displayName}</BreadcrumbItem>
        ) : (
          <BreadcrumbItem key={routeTo}>
            <Link to={routeTo}>{displayName}</Link>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
