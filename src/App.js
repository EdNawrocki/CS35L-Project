import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./routes/Home";
import NewItem from "./routes/NewItem";
import Login from "./routes/Login";
//import ErrorPage from "./error-page";
import {useState} from "react";



export default function App() {
    const [isAuth, setIsAuth] = useState(false);
    return (
        <Router>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/NewItem" element={<NewItem />} />
                <Route path="/Login" element={<Login />} />
            </Routes>
        </Router>
        )
}