import React from 'react'
import Add from "../img/addAvatar.png"

const Register = () => {
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Chat System</span>
        <br/>
        <span className='title'>Sign up</span>
        <form>
            <input type="text" placeholder='username'/>
            <input type="email" placeholder='email'/>
            <input type="password" placeholder='password'/>
            <input style={{display:"none"}} type="file" id='file' />
            <label htmlFor='file'>
                <img src={Add} alt=''/>
                <span>Add your avatar</span>

            </label>
            <button className='firstbut'>Sign up</button>
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  )
}

export default Register
