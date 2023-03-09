import "../styles.css"

import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Logout() {
    const navigate = useNavigate();
    
    const {dispatch} = useContext(AuthContext);
    
    const handleClick = () => {
        dispatch({type:"LOGOUT"});
        navigate("/login");
    };

    return (
        <div className = "logout">
            <button className="logout" onClick={ handleClick }>Logout</button>
        </div>
    );
}

export default Logout;