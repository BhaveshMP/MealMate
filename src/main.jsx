import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import React from "react"
import ReactDOM from "react-dom/client"
import Register from "./pages/register"
import Home from "./pages/home"
import Demo from "./pages/demo"

import Table from "./components/common/Table"
import MenuList from "./pages/menuitems"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Login from "./pages/login"
import Profile from "./pages/profile"
import HomeHeroSection from "./components/HomeHeroSection"; // Importing the HomeHeroSection component
import Menu from "./components/dashboard/pages/components/menu"
import Dashboard from './pages/dashboard'
import Index from "./components/dashboard/pages/index"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout
    children: [
      { path: "", element: <Home /> },       // "/" route
      { path: "login", element: <Login /> }, // "/login"
      { path: "register", element: <Register /> }, // "/register"
      { path: "profile", element: <Profile /> },   // "/profile"
      { path: "menu", element: <MenuList /> }, // "/menulist"
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />, // layout
    children: [
      { path: "", element: <Index /> },     // "/dashboard/login"
      { path: "table", element: <Table /> }, // "/dashboard/register"
      { path: "profile", element: <Profile /> },   // "/dashboard/profile"
      { path: "menu", element: <Menu /> }, // outside layout
    ],
  },
  
  { path: "/demo", element: <Demo /> }, // outside layout
]);


createRoot(document.getElementById('root')).render(
  <StrictMode >
    <RouterProvider router={router} />
  </StrictMode>,
)
