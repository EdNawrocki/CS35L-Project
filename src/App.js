import {useContext} from "react"
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import NewItem from "./pages/newitem"
import ViewItem from "./pages/viewitem"
import DisplayStats from "./pages/displaystats"
import { AuthContext } from "./context/AuthContext"
import styled from 'styled-components';

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
grid-template-columns: repeat(2, 32vw) 1fr;

#Home {}

#Login {}

#About {}

h1 {
    font-size: 20px;
    text-align: center;
    color: #FFFFFF;
}
`


function App() {
  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/login" />
  }

  return (
    <Router>
          <nav>
        <Link to="/viewitem">ViewItem</Link>
          </nav>
          < Container >
              <h1><i className="fa fa-database fa-3x"></i> Bruin Industrial Storage Solutions</h1></Container>
          <Toolbar>
              <div id="Home"><Link to="/" style={{ textDecoration: 'none' }}><h1>Home</h1></Link></div>
              <div id="Login"><Link to="/login" style={{ textDecoration: 'none' }}><h1>Login</h1></Link></div>
              <div id="About"><h1>About</h1></div>

          </Toolbar>
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
            path="/viewitem"
            element={
                <RequireAuth>
                    <ViewItem />
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