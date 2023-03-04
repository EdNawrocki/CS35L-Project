import React from "react";
import {useState} from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebaseconfig"

const Login = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e)=> {
        e.preventDefault();
    }

    return (<div>
        <form onSubmit={handleLogin}>
            <input type="email" placeholder="email" onChange={e=>setEmail(e.target.value)} />
            <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
            <button type="submit">Login</button>
            {error && <span>Ware do you think you're going? Wrong email or password!</span>}
        </form>
    </div>);
}

export default Login;

