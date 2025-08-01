
"use client";

import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

export default function SideBar() {
  return (
    <Sidebar className="h-fit " aria-label="Default sidebar example" >
      <SidebarItems className="bg-gray-600/10 h-[90vh]">
        <SidebarItemGroup>
          <SidebarItem href="/adminDashboard" icon={HiChartPie}>
            Dashboard
          </SidebarItem>
          <SidebarItem href="/adminDashboard/menu" icon={HiViewBoards} label="Pro" labelColor="dark">
            Menu
          </SidebarItem>
          <SidebarItem href="#" icon={HiInbox} label="3">
            Inbox
          </SidebarItem>
          <SidebarItem href="/adminDashboard/user" icon={HiUser}>
            Users
          </SidebarItem>
          <SidebarItem href="/menu" icon={HiShoppingBag}>
            Dishes
          </SidebarItem>
          <SidebarItem href="#" icon={HiArrowSmRight}>
            Sign In
          </SidebarItem>
          <SidebarItem href="#" icon={HiTable}>
            Sign Up
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
