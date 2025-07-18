
"use client";
import { DarkThemeToggle } from "flowbite-react";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react"

import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";

export default function NavbarContent() {


const [activeUser, setActiveUser] = useState(() => {
  const user = sessionStorage.getItem("activeUser");
  return user ? JSON.parse(user) : null;
});

const logout = () => {
  sessionStorage.removeItem("activeUser");
  window.dispatchEvent(new Event("userChanged")); // Notify all listeners
};


useEffect(() => {
  const handleUserChange = () => {
    const user = sessionStorage.getItem("activeUser");
    setActiveUser(user ? JSON.parse(user) : null);
  };

  window.addEventListener("userChanged", handleUserChange);
  handleUserChange(); // Initial load

  return () => window.removeEventListener("userChanged", handleUserChange);
}, []);


  return (
    <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-md px-6 py-3 flex justify-between items-center shadow-lg shadow-gray-600/20">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <imgs
          src="/public/MM.png"
          alt="Canteen Logo"
          className="h-10 w-auto"
        />
      </div>

      {/* Center Nav Links */}
      <nav className="hidden md:flex gap-10 font-medium text-lg">
        <Link to="/" className="hover:text-gray-300 transition">Home</Link>
        <Link to="/menu" className="hover:text-gray-300 transition">Menu</Link>
        <Link to="/catering" className="hover:text-gray-300 transition">Catering</Link>
        <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
      <DarkThemeToggle className="relative bottom-1" />
      </nav>
      

      {/* Avatar Dropdown */}
      <div className="flex items-center">

        { !activeUser ?
    <div className="flex gap-1">
        <Link to="/login" className="hover:text-gray-300 transition">Login</Link> /
        <Link to="/register" className="hover:text-gray-300 transition">Register</Link>
    </div>

      :
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="User settings"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Kushagra Padwal</span>
            <span className="block text-sm font-medium truncate">
              kushagra@canteen.com
            </span>
          </DropdownHeader>
          <DropdownItem href="/profile">My Profile</DropdownItem>
          <DropdownItem href="/orders">Orders</DropdownItem>
          <DropdownItem href="/feedback">Feedback</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={logout}>Logout</DropdownItem>
        </Dropdown>
}
      </div>

      
    </header>
  );
}
