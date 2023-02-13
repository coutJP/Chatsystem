// import { onAuthStateChanged } from "firebase/auth";
// import { createContext, useEffect, useReducer, useState,useContext } from "react";
// import { auth } from "../firebase";


// export const ChatContext=createContext()
// export const ChatContextProvider=({children})=>{
//     const {currentUser}=useContext(ChatContext)
//     const INITIAL_STATE={
//         chatId:"null",
//         user:{}
//     }
//     const ChatReducer=(state,action)=>{
//         switch(action.type){
//             case "CHANGE_USER":
//             return{
//                user:action.payload,
//                chatId:currentUser.uid>action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,
 
//             };
//             default:
//                 return state;
//         }
//     }

//     const [state,dispatch]=useReducer(ChatReducer,INITIAL_STATE);
//     //he mn hota bl index.js
//     return(
//     <ChatContext.Provider value={{data:state,dispatch}}> {/*it means this component can reach this currentUser*/}
//         {children} {/*  our app  */}
//     </ChatContext.Provider>
// );
//     };
