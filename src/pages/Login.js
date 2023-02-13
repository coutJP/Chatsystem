import React, { useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Add from "../img/addAvatar.png"

const Login = () => {

  const [err,setErr]=useState(false);
  const navigate=useNavigate();

  const handleSubmit=async (e)=>{
    e.preventDefault()//ta ma yaamol refresh
    const email=e.target[0].value;
    const password=e.target[1].value;

    try{  
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/')

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
        <span className='title'>Log in</span>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder='email'/>
            <input type="password" placeholder='password'/>
            <input style={{display:"none"}} type="file" id='file' />
            <button className='firstbut'>Sign in</button>
            {err && <span>Something went error</span>}

        </form>
        <p>You don't have an account? <Link to='/register'>Sign up</Link></p>
      </div>
    </div>
  )
}

export default Login
