import {useContext} from "react"
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import NewItem from "./pages/newitem"
import ViewItem from "./pages/viewitem"
import Logout from "./pages/logout"
import Item from "./pages/item"
import { AuthContext } from "./context/AuthContext"
import styled from 'styled-components';
import 'font-awesome/css/font-awesome.min.css';

const Container = styled.div`
position: static;
width: 1fr;
height: 18vh;
left: 0px;
top: 0px;
background-color: #094CF8C2;

h1 {
    font-size: 30px;
    text-align: center;
    color: #FFFFFF;
}

`;

const Toolbar = styled.div`
position: static;
margin-top: 5px;
width: 100%;
height: 57px;
left: 0px;
top: 123px;
background-color: #094CF8C2;
display: grid;
grid-template-columns: repeat(2, 50vw);


#Home {
text-decoration: none;
}

#About {
text-decoration: none;
}

h1 {
    font-size: 20px;
    text-align: center;
    color: #FFFFFF;
    text-decoration: none;
}
Link {
    text-decoration: none;
}
`



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
    <Container>

        <h1><i className="fa fa-database fa-3x"></i> Bruin Industrial Storage Solutions</h1></Container>
          <Toolbar>
              <Link to="/">
                  <div id="Home"><h1>Home</h1></div>
              </Link>
              <div id="About">
                  <Link to={currentUser ? "/logout" : "/login"}>
                      <h1>{currentUser ? "Logout" : "Login"}</h1>
                  </Link>
              </div>

    </Toolbar>
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
        <Route
          path="/item"
          element={
            <RequireAuth>
              <Item />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;