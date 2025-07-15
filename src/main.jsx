import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Login from "./pages/login"

const router  = createBrowserRouter([
    {
      path: "/",
      element: <App/>, //layout
      children:[
        {path:"/", element:<Login/>},
        {path:"/login", elemtn:<Login/>}
      ]
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode >
    <RouterProvider router={router} />
  </StrictMode>,
)
