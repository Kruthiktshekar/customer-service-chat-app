import React, { createContext, useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AdminContext, AdminProvider } from "../../contexts/AdminContext";
import { axiosApi } from "../../axios";
import { toast } from "react-toastify";

function Sidebar() {

    const {adminDispatch} = useContext(AdminContext)
    const navigate = useNavigate()
    
    const logoutHandler = () =>{
        localStorage.removeItem('token')
        navigate('/login')
    }

   useEffect(()=>{
    (async()=>{
      try{
        const promptResponse = await axiosApi.get('/prompt' , {headers:{'Authorization' : localStorage.getItem('token')}})
        if(promptResponse){
          adminDispatch({type : "SET_PROMPTS",payload:promptResponse.data})
        }
        const userResponse = await axiosApi.get('/users' , {headers:{'Authorization' : localStorage.getItem('token')}})
        console.log(userResponse.data)
        if(userResponse){
          adminDispatch({type : "SET_USERS" , payload : userResponse.data})
        }
        const agentResponse = await axiosApi.get('/agents' , {headers:{'Authorization' : localStorage.getItem('token')}})
        console.log(agentResponse.data)

        if(agentResponse) {
          adminDispatch({type : "SET_AGENTS" , payload : agentResponse.data})
        }
      }
      catch(error){
        console.log(error)
        if(error.response.data.msg){
            toast.error(error.response.data.msg)
        }
        toast.error('Something went wrong')
      }
      
    })()
   },[])
   
  return (
    <div className="admin-panel">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <NavLink className='navlink' to="/admin">Dashboard</NavLink>
        <NavLink className='navlink' to="/admin/users">Users</NavLink>
        <NavLink className='navlink' to="/admin/agents">Agents</NavLink>
        <NavLink className='navlink' to="/admin/prompts">Prompts</NavLink>
        <button className="navlink" onClick={logoutHandler}>Logout</button>
      </div>
      <div className="main-content">{<Outlet/>}</div>
    </div>
  );
}

export default Sidebar;
