import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer, useState,useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";


export const ChatContext=createContext()
export const ChatContextProvider=({children})=>{
    const {currentUser}=useContext(AuthContext)
    const INITIAL_STATE={
        chatId:"null",//2
        user:{}//1
    }
    const ChatReducer=(state,action)=>{
        switch(action.type){
            case "CHANGE_USER": //when i click aal user bde ghayr l user//1 w a3ml update lal chatid//2
            return{
               user:action.payload,
               chatId:currentUser.uid>action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,
 
            };
            default:
                return state;
        }
    }

    const [state,dispatch]=useReducer(ChatReducer,INITIAL_STATE);
    //he mn hota bl index.js
    return(
    <ChatContext.Provider value={{data:state,dispatch}}> {/*we are able to dispatch this action and update our user and chatid*/}
        {children} {/*  our app  */}
    </ChatContext.Provider>
);
    };
