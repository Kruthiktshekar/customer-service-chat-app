// Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosApi } from '../axios';
import {toast} from 'react-toastify'

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname , setFullname]= useState('')
  const [error, setError] = useState('');
  const clientSideErrors = {}
  
 const  navigate = useNavigate()

 const runClientSideValidation = () =>{
    if(username.trim().length === 0){
      clientSideErrors.name = 'username cannot be empty'
    }else if(username.trim().length === 0){
      clientSideErrors.fullname = 'fullname cannot be empty'
    }else if(password.trim().length === 0){
      clientSideErrors.password = 'Password cannot be empty'
    }else if(password.length>128 || password.length < 4) {
      clientSideErrors.password = 'Password should be greater than 4 digits'
    }
  }

  const signUpHandler = async(e) => {
    e.preventDefault()
    const formData = {
        username,
        fullname,
        password
    }

    runClientSideValidation()
    if(Object.keys(clientSideErrors).length ==0){
        try{
            const response = await axiosApi.post('/signup',formData)
            if(response){
                  toast.success('Account created, please login')
                   navigate('/login')
                  setUsername('')
                  setPassword('')
                  setError({})
              }
        }
        catch(error){
            console.log(error)
            toast.error(error.response.message)
            setError({})

        }

    }else{
        setError(clientSideErrors)
    }
  }

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error.name && <p className="error-message">{error.name}</p>}
      <form onSubmit={signUpHandler}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
         {error.fullname && <p className="error-message">{error.name}</p>}
        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
      {error.password && <p className="error-message">{error.password}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default Signup;
