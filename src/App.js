import {useContext} from "react"
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import NewItem from "./pages/newitem"
import DisplayStats from "./pages/displaystats"
import { AuthContext } from "./context/AuthContext"

function App() {
  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/login" />
  }

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/newitem">NewItem</Link>
        <Link to="/displaystats">DisplayStats</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/newitem"
          element={
            <RequireAuth>
              <NewItem />
            </RequireAuth>
          }
        />
        <Route
          path="/displaystats"
          element={
            <RequireAuth>
              <DisplayStats />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;