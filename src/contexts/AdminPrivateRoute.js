import React, { useContext, useEffect } from 'react'
import { axiosApi } from '../axios'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './Auth'

function AdminPrivateRoute(props) {
    const token = localStorage.getItem('token')
    const {loginUser} = useContext(AuthContext)
    if(!token){
        return <Navigate to='/login'/>
    }else{
        
        if(loginUser.user.role == 'admin'){
            return props.children
        }else{
            return <p>403 Forbidden</p>
        }

    }
    
  
}

export default AdminPrivateRoute
