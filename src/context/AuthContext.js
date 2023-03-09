// SEE '../pages/login.js' AND '../pages/logout.js' AND '../App.js' FOR EXAMPLE USES

// This context allows global storage of the user. It works in conjunction with './AuthReducer.js'
// It can be used to globally answer questions like: 
//      * is the user logged in? 
//      * what is the current user's email?

import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.currentUser))
    },[state.currentUser])

    return (
        <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};