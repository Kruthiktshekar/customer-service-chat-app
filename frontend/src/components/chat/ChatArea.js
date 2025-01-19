import React, { useContext, useEffect, useRef, useState } from "react";

import { axiosApi } from "../../axios";
import { io } from 'socket.io-client';
import { AuthContext } from "../../contexts/Auth";
import { toast } from "react-toastify";

function ChatArea() {

    const [message,setMessage] = useState([])
    const [chats, setChats] = useState([])
    const [prompts, setPrompts] = useState([])
    const {loginUser} = useContext(AuthContext)
    const [chatId, setChatId] = useState('')

    const socket = io('http://localhost:3131')

    useEffect(()=>{
        (async()=>{
            try{
                const response = await axiosApi.get('/prompt', {headers:{'Authorization' : localStorage.getItem('token') }})
                console.log(response)
                if(response){
                    setPrompts(response.data)
                }
            }
            catch(error){
                console.log(error)
                toast.error('Something went wrong')
            }
        })()
    },[])

    // useEffect(()=>{
    //     if(loginUser.user.role = 'agent' || 'user')
    //     (async()=>{
    //         try{
    //             const response = await axiosApi.get('/chat', {headers:{'Authorization' : localStorage.getItem('token') }})
    //             console.log(response , 'chatss')
    //             if(response){
    //                 setChats(response.data)
    //             }
    //         }
    //         catch(error){
    //             console.log(error)
    //         }
    //     })()
    // },[])

    

    useEffect(() => {
        if (socket) {
          socket.emit("add-user", loginUser.user._id);
        }
      }, [socket]);

    const promptHandling = async(prompt) => {
        const formData = {
            message : prompt.prompt
        }
        try{
            const sendMsg = await axiosApi.post('/chat' , formData , {headers:{'Authorization':localStorage.getItem('token') }})
            if(sendMsg){
                const data = {promptId : prompt._id , to : loginUser.user._id}
                socket.emit('prompt-clicked', data)
                setChats((prev)=>[...prev , {fromSelf : true , message : prompt.prompt}])
            }
        }
        catch(error) {
            console.log(error)
            toast.error('Something went wrong')
        }
   }

   const handleAgentReq = async() => {
    try{
       setChats((prev)=> [...prev, {fromSelf:false , message : 'wait for a while..'}])
        socket.emit('request-agent', loginUser.user._id)
    }
    catch(error){
        console.log(error)
        toast.error('Something went wrong')
    }
   }

   socket.on('agent-assigned', (data) => {
    setChatId(data._id)
    setChats((prev)=> [...prev, {fromSelf:false , message : `Greetings... ${data.username} is here to help you`}])
   })

   

   socket.on('no-agents', (data) => {
    setChats((prev)=> [...prev, {fromSelf:false , message : data}])
   })

    socket.on('receive-answer', (data)=>{
        console.log(data)
        setChats((prevChats) => [
            ...prevChats,
            {
              fromSelf: false,
              message: (
                <div>
                  <p>{data}</p> <br/>
                  <p>Do like to chat with our agent to know more..?</p>
                  <button onClick={handleAgentReq}>Chat with Agent</button>
                </div>
              )
            }
          ])
    })

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
            toast.error('Something went wrong')
        }
    }
    socket.on('receive-msg' , (data)=>{
        console.log(data)
        setChats([...chats,data])
    })
    

  return (
    <div className="chat-area">
        <div>
          <div className="chat-container">
            <div className="chat-header">
              <h2>Customer Support</h2>
            </div>
            <div className="prompt-container">
        <h4>Common Questions</h4>
        {prompts.map((prompt) => (
          <div 
            key={prompt._id} 
            className="prompt-item"
            onClick={()=>{promptHandling(prompt)}}
          >
            {prompt.prompt}
          </div>
        ))}
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
    </div>
  );
}

export default ChatArea;
