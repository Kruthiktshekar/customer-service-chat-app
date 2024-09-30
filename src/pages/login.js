// Login.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosApi } from '../axios';
import { AuthContext } from '../contexts/Auth';
import {toast} from 'react-toastify'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const clientSideErrors = {}

  const {dispatch} = useContext(AuthContext)
  

  const navigate = useNavigate()

  const runClientSideValidation = () =>{
    if(username.trim().length === 0){
      clientSideErrors.name = 'username cannot be empty'
    }else if(password.trim().length === 0){
      clientSideErrors.password = 'Password cannot be empty'
    }else if(password.length>128 || password.length < 4) {
      clientSideErrors.password = 'Password should be greater than 4 digits'
    }
  }

  const loginHandler = async(e) => {
    e.preventDefault()
    const formData = {
        username,
        password
    }
    runClientSideValidation()
    if(Object.keys(clientSideErrors).length == 0){
    try{
        const response = await axiosApi.post('/login',formData)
        console.log(response.data)
        if(response){
            localStorage.setItem('token' , response.data.token)
            const userData = await axiosApi.get('/user' , {headers : {'Authorization' : localStorage.getItem('token')}})
            if(userData){
              dispatch({type : 'LOGIN' , payload : userData.data})
              if(userData.data.role == 'user'){
                  navigate('/home')
              }else if(userData.data.role == 'agent'){
                navigate('/agent-chatbox')
              }else if(userData.data.role == 'admin'){
                navigate('/admin')
              }
              setError({})
              toast.success('Login successfully')
              setUsername('')
              setPassword('')

            }
          }
    }
    catch(error){
        if(error.status == 401) {
            toast.error(error.response.data.msg)
          }
         else {
             toast.error('something went wrong')
         }
          setError({})

    }
}else{
    setError(clientSideErrors)
}
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error.name && <p className="error-message">{error.name}</p>}
      <form  onSubmit={loginHandler}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to='/signup'>SignUp</Link>
      </p>
    </div>
  );
};

export default Login;
