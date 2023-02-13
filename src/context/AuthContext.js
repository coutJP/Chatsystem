import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";


export const AuthContext=createContext()

export const AuthContextProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState({})

    //to check if we have user or not
    useEffect(()=>{
        const unsub=onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
            console.log(user);
        });
        return ()=>{
            unsub();
        }
    },[]);

    //he mn hota bl index.js
    return(
    <AuthContext.Provider value={{currentUser}}> {/*it means this component can reach this currentUser*/}
        {children} {/*  our app  */}
    </AuthContext.Provider>
)
}