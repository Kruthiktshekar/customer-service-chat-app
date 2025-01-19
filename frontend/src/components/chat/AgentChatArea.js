import React, { useContext, useEffect, useRef, useState } from "react";

import { axiosApi } from "../../axios";
import { io } from 'socket.io-client';
import { AuthContext } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";

function AgentChatArea() {

    const [message,setMessage] = useState([])
    const [chats, setChats] = useState([])
    const {loginUser} = useContext(AuthContext)
    const [chatId, setChatId] = useState('')
    const navigate = useNavigate()

    const socket = io('http://localhost:3131')



    useEffect(()=>{
        (async()=>{
            try{
                const response = await axiosApi.get('/chat', {headers:{'Authorization' : localStorage.getItem('token') }})
                if(response){
                    setChats(response.data)
                }
            }
            catch(error){
                console.log(error)
            }
        })()
    },[])

    

    useEffect(() => {
        if (socket) {
          socket.emit("add-user", loginUser.user._id);
        }
      }, [socket]);




    const submitHandler = async(e) => {
        e.preventDefault()
        const formData = {
            message : message,
            to : chatId
        }
        try{
            const response = await axiosApi.post('/chat', formData , {headers:{'Authorization' : localStorage.getItem('token')}})
            if(response){
                setChats((prev)=>[...prev , {fromSelf : true , message: message}])
                const data = {fromSelf : false , message : message , to : chatId}
                socket.emit('send-msg',data)
                setMessage('')
            }
        }
        catch(error){
            console.log(error)
        }
    }
    socket.on("new-chat" , (data)=>{
        console.log(data)
        setChatId(data)
    })
    
    socket.on('receive-msg' , (data)=>{
        console.log(data)
        setChats([...chats,data])
    })

    const logoutHandler = () => {
       socket.emit('logout',loginUser.user._id)
        localStorage.removeItem('token')
        navigate('/login')
    }
    

  return (
    <div className="chatarea">
        <div>
          <div className="chat-container">
            <div className="chat-header">
              <h2>Agent Support</h2>
            </div>
            <div className="chat-messages" >
              {chats.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${msg.fromSelf ? "sent" : "received"}`}
                >
                  <div className="content">{msg.message}</div>
                </div>
              ))}
            </div>
            <form onSubmit={submitHandler} >
              <div className="chat-input">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
        <button onClick={logoutHandler}>logout</button>
    </div>
  );
}

export default AgentChatArea;
