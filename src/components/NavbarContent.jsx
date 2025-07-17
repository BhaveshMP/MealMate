import DarkModeToggle from "./DarkModeToggle";
"use client";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";

export default function NavbarContent() {
  return (
    <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src="/public/MM.png"
          alt="Canteen Logo"
          className="h-10 w-auto"
        />
      </div>

      {/* Center Nav Links */}
      <nav className="hidden md:flex gap-10 text-white font-medium text-lg">
        <a href="/" className="hover:text-gray-300 transition">Home</a>
        <a href="/menu" className="hover:text-gray-300 transition">Menu</a>
        <a href="/catering" className="hover:text-gray-300 transition">Catering</a>
        <a href="/contact" className="hover:text-gray-300 transition">Contact</a>
      </nav>
      
      

      {/* Avatar Dropdown */}
      <div className="flex items-center">
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
          <DropdownItem href="/logout">Logout</DropdownItem>
        </Dropdown>
      </div>

      
    </header>
  );
}
