import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import React from "react"
import ReactDOM from "react-dom/client"
import Register from "./pages/register"
import Home from "./pages/home"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Login from "./pages/login"
import Profile from "./pages/profile"
import Coupon from "./pages/coupon"
import Scan from "./pages/scan"
import HomeHeroSection from "./components/HomeHeroSection"; // Importing the HomeHeroSection component

const router  = createBrowserRouter([
    {
      path: "/",
      element: <App/>, //layout
      children:[
        {path:"/", element:<Home/>},
        {path:"/login", element:<Login/>},
        {path:"/register", element:<Register/>},
        {path:"/profile",element:<Profile/>},
        {path:"/coupon",element:<Coupon/>},
        {path:"/scan",element:<Scan/>}
      ]
    },
    { path: "/login", element: <Login /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode >
    <RouterProvider router={router} />
  </StrictMode>,
)
