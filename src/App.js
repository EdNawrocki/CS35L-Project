import {useContext} from "react"
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import NewItem from "./pages/newitem"
import ViewItem from "./pages/viewitem"
import Logout from "./pages/logout"
import { AuthContext } from "./context/AuthContext"

function App() {
  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/login" />
  }

  const RequireNotAuth = ({children}) => {
    return currentUser ? <Navigate to="/logout" /> : (children)
  }

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to={currentUser ? "/logout" : "/login"}>{currentUser ? "Logout" : "Login"}</Link>
        <Link to="/newitem">NewItem</Link>
        <Link to="/viewitem">ViewItem</Link>
      </nav>
      <Routes>
        <Route path="/login" element={
          <RequireNotAuth>
            <Login />
          </RequireNotAuth>
        } />
        <Route path="/logout" element={
          <RequireAuth>
            <Logout />
          </RequireAuth>
        } />
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
          path="/viewitem"
          element={
            <RequireAuth>
              <ViewItem />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;