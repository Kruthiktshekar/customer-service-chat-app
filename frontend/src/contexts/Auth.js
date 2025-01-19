import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "../reducers/authrReducer";
import { useNavigate } from "react-router-dom";
import { axiosApi } from "../axios";

export const AuthContext = createContext()

export  function AuthProvider (props) {
    const navigate = useNavigate()

    const initialState = {
        isLoggedIn : false,
        user : {}

    }
    const [loginUser , dispatch] = useReducer(AuthReducer , initialState)

    useEffect(()=>{
        async function  getUser(){
            try{
                const token = localStorage.getItem('token')
                if(token){
                    const userData = await axiosApi.get('/user' , {headers : {'Authorization' : token}})
                    if(userData){
                      dispatch({type : 'LOGIN' , payload : userData.data})
                      if(userData.data.role == 'user'){
                        navigate('/home')
                    }else if(userData.data.role == 'agent'){
                      navigate('/agent-chatbox')
                    }else if(userData.data.role == 'admin'){
                        navigate('/admin')
                      }
                    }
               }   
           }
           catch(err) {
            if(err.response == 'token expiered'){
                navigate('/login')
                localStorage.removeItem('token')
            }
            console.log('[ERROR] unable to get token')
           }
        }
        getUser()
    },[])

    console.log(loginUser)
    return(
        <div>
            <AuthContext.Provider value={{loginUser,dispatch}}>
                {props.children}
            </AuthContext.Provider>
        </div>
    )
}
