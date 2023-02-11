import React from 'react'
import Add from "../img/addAvatar.png"

const Login = () => {
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Chat System</span>
        <br/>
        <span className='title'>Log in</span>
        <form>
            <input type="email" placeholder='email'/>
            <input type="password" placeholder='password'/>
            <input style={{display:"none"}} type="file" id='file' />
            <button className='firstbut'>Sign in</button>
        </form>
        <p>You don't have an account? Sign up</p>
      </div>
    </div>
  )
}

export default Login
