import NavbarContent from "./components/common/NavbarContent"; // Adjust the path if needed
import { Outlet, Link } from "react-router-dom"
function App() {

  return (
    <>
   <div>
      <NavbarContent />
      <Outlet /> {/* Renders the matching child route */}
    </div>
    </>
  )
}

export default App