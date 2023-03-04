import React from "react";
import {auth, provider} from '../firebase-config';
import {signInWithPopup} from 'firebase/auth';

function Login() {

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            
        })
    }

    return <div className="loginPage">
        <p>Sign In With Google to Continue</p>
        <button className="login-with-google-btn">Sign in with Google</button>
    </div>
}

export default Login;