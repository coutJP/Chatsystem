import React, { useState } from 'react'
import { createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import { auth, storage ,db} from "../firebase";
import Add from "../img/addAvatar.png"
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 



const Register = () => {
  const [err,setErr]=useState(false);
  const handleSubmit=async (e)=>{
    e.preventDefault()//ta ma yaamol refresh
    const displayName=e.target[0].value;
    const email=e.target[1].value;
    const password=e.target[2].value;
    const file=e.target[3].files[0];

    try{  
      //create user  
      const res=await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      
      (error) => {
        setErr(true);
        console.log("errr")
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(res.user,{
              displayName,
              photoURL:downloadURL,
            });        
            await setDoc(doc(db,"users",res.user.uid),{//esm l table users w bdawr eelyn bl uid l bytlaa eende bas sayiv w db hye shi maarfo b firebase.js
              uid:res.user.uid,
              displayName,
              email,
              photoURL:downloadURL
        });
      });
    }
);
}catch(err){
  setErr(true);
  console.log("thiserr")
}
  };
 

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Chat System</span>
        <br/>
        <span className='title'>Sign up</span>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='username'/>
            <input type="email" placeholder='email'/>
            <input type="password" placeholder='password'/>
            <input style={{display:"none"}} type="file" id='file' />
            <label htmlFor='file'>
                <img src={Add} alt=''/>
                <span>Add your avatar</span>

            </label>
            <button className='firstbut'>Sign up</button>
            {err && <span>Something went error</span>}
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  )
}

export default Register;
