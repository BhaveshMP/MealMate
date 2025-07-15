
import { Outlet, Link } from "react-router-dom"
function App() {

  return (
    <>
   <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link>
      </nav>
      <hr />
      <Outlet /> {/* Renders the matching child route */}
    </div>
    </>
  )
}

export default App
