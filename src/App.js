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
import PropTypes from 'prop-types';
import React from 'react';
import About from './pages/about';

const Container = styled.div`
margin-top: 5px;
display: flex;
justify-content: center;
align-items: center;
width: 1fr;
height: 18vh;
background-color: #094CF8C2;

h1 {
    font-family: Georgia, serif;
    font-size: 30px;
    color: #FFFFFF;
}

i {
margin-right: 10px;
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
grid-template-columns: repeat(5, 20vw);


#Home {
text-decoration: none;
}

#VIEWITEM {}
#NEWITEM {}

#About {

}

#Logout {
text-decoration: none;
}

h1 {
    position: relative;
    font-size: 20px;
    text-align: center;
    color: #FFFFFF;
    text-decoration: none;
}
Link {
    text-decoration: none;
}

margin-bottom: 10px;
`
const Title = styled.div`
margin-top: 5px;
display: flex;
justify-content: center;
align-items: center;

i {
 margin-right: 20px;
display: flex;
justify-content: center;
align-items: center;
}

`



function App() {
  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/login" />
    }
    RequireAuth.propTypes = {
        children: PropTypes.node.isRequired,
    };

  const RequireNotAuth = ({children}) => {
    return currentUser ? <Navigate to="/logout" /> : (children)
    }

    RequireNotAuth.propTypes = {
        children: PropTypes.node.isRequired,
    };

  return (
    <Router>
    <Container>
        <h1>
                  <Title><i className="fa fa-database fa-3x"></i>Bruin Industrial<br/>Storage Solutions</Title>
        </h1>
    </Container>
          <Toolbar>
              <Link to="/" style={{ textDecoration: 'none' }}>
                  <div id="Home"><h1>Home</h1></div>
              </Link>
              <Link to="/viewitem" style={{ textDecoration: 'none' }}>
                  <div id="VIEWITEM"><h1>View Items</h1></div>
              </Link>
              <Link to="/newitem" style={{ textDecoration: 'none' }}>
                  <div id="NEWITEM"><h1>New Item</h1></div>
              </Link>
              <Link to="/about" style={{ textDecoration: 'none' }}>
                  <div id="About"><h1>About</h1></div>
              </Link>
              <div id="Logout">
                  <Link to={currentUser ? "/logout" : "/login"} style={{ textDecoration: 'none' }}>
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
        <Route
            path="/about"
            element={
                <RequireAuth>
                    <About />
                </RequireAuth>
            }
        />
      </Routes>
    </Router>
  );
}

export default App;