
import { Outlet, Link } from "react-router-dom"
function App() {

  return (
    <>
   <div>
      <hr />
      <Outlet /> {/* Renders the matching child route */}
    </div>
    </>
  )
}

export default App