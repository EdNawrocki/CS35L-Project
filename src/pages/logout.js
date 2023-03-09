import "../styles.css"

import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Logout() {
    const navigate = useNavigate();             // func for navigating user to login page on logout
    
    const {dispatch} = useContext(AuthContext); // context for global storage of logged in user
    
    const handleClick = () => {     // upon clicking 'logout'...
        dispatch({type:"LOGOUT"});      // tell the context that the user has logged out
        navigate("/login");             // navigate to login page
    };

    return (
        <div className = "logout">
            <button className="logout" onClick={ handleClick }>Logout</button>
        </div>
    );
}

export default Logout;