"use client";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

export default function NavbarContent() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/canteen-bg.jpg')" }} // Place your image in /public/images/
    >
      <Navbar fluid rounded className="bg-gray-900 bg-opacity-80 text-white">
        <NavbarBrand href="/">
          <img
            src="/favicon.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Canteen Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
            Office Canteen
          </span>
        </NavbarBrand>

        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">Kushagra Padwal</span>
              <span className="block truncate text-sm font-medium">
                kushagra@canteen.com
              </span>
            </DropdownHeader>
            <DropdownItem href="/profile">My Profile</DropdownItem>
            <DropdownItem href="/orders">Orders</DropdownItem>
            <DropdownItem href="/feedback">Feedback</DropdownItem>
            <DropdownDivider />
            <DropdownItem href="/logout">Logout</DropdownItem>
          </Dropdown>
          <NavbarToggle />
        </div>

        <NavbarCollapse>
          <NavbarLink href="/" active>
            Home
          </NavbarLink>
          <NavbarLink href="/about">About</NavbarLink>
          <NavbarLink href="/menu">Menu</NavbarLink>
          <NavbarLink href="/pricing">Pricing</NavbarLink>
          <NavbarLink href="/contact">Contact</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}