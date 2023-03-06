import "../styles.css"

import { useContext, useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";
import { useNavigate } from "react-router-dom";

import {AuthContext} from "../context/AuthContext"

function Login() {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const {dispatch} = useContext(AuthContext)

  const handleLogin = (e)=>{
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user})
        navigate("/")
      })
      .catch((error) => {
        setError(true)
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
