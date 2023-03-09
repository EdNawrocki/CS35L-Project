import "../styles.css"

import { useContext, useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";
import { useNavigate } from "react-router-dom";

import {AuthContext} from "../context/AuthContext"

function Login() {
  const [error, setError] = useState(false)     // error logging in?
  const [email, setEmail] = useState("")        // state for input email
  const [password, setPassword] = useState("")  // state for input password

  const navigate = useNavigate()              // func for navigating to page on successful login

  const {dispatch} = useContext(AuthContext)  // user context (how to update user globally upon successful login)

  const handleLogin = (e)=>{    // upon clicking 'login'... 
    e.preventDefault();   // make sure something was inputted

    signInWithEmailAndPassword(auth, email, password)   // see if Firebase allows the email/password combination
      .then((userCredential) => {       // if it's valid: 
        const user = userCredential.user;       // set 'user' to Firebase's user profile
        dispatch({type:"LOGIN", payload:user})  // set global context to logged in as user
        navigate("/")                           // navigate to home page
      })
      .catch((error) => {               // if it's invalid: 
        setError(true)                          // set error to true
      })
  }

  return (
    <div className="login">
      <form className="login" onSubmit={handleLogin}>
        <input className="login" type="email" placeholder="email" onChange={e=>setEmail(e.target.value)} />
        <input className="login" type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
        <button className="login" type="submit">Login</button>
        {error && <span className="login">Wrong email or password!</span>}
      </form>
    </div>
  );
}

export default Login;
