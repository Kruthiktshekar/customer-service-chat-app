import Chat from "../models/chat-model.js";
import User from "../models/user-model.js";

const addMessge = async(req,res) => {
    const systemId = '66e8eee4ae18b2990ba4a13b'
    const {message} = req.body
    const to = req.body.to ? req.body.to : systemId
    const from = req.userId 
    const formData = {
        message : {text:message},
        users : [from , to],
        sender : from
    }
    try{
        const data = await Chat.create(formData)
        if(data) return res.json ({msg:'message added'})
        return res.json({msg:"cannot add message"})
     }catch (error){
        console.log(error)
     }
}

const receiveMessage = async(req,res) => {
    const from  = req.userId
    const {to} = req.body
    const user = await User.findById(from)
    try {
        let messages
        if(user.role == 'agent'){
            messages = await Chat.find({
                    users: {
                      $all: [from, to] 
                    }
              }).sort({ updatedAt: 1 })
        }else if (user.role == 'user'){
            messages = await Chat.find({
                users: from
              }).sort({ updatedAt: 1 }) 
        }
        const projectedMsgs = messages.map((msg)=>{
            return {
                fromSelf : msg.sender.toString() === from,
                message : msg.message.text
            }
        })
       return res.json(projectedMsgs)
    }catch(error){
        throw error
    }
}

const chatUserList = async(req,res) => {
    const id = req.userId
    try{
        const chats = await Chat.find({users : id}).populate('users' , 'username')

        console.log(chats)

        const uniqueUsers = {};

    chats.forEach((chat) => {
      chat.users.forEach((user) => {
        if (user.toString() !== id && !uniqueUsers[user]) {
          uniqueUsers[user._id] = {
            _id: user._id,
            username: user.username,
          };
        }
      });
    })

      const userListArray = Object.values(uniqueUsers);
      const userList = userListArray.filter(ele => ele._id.toString() !== id.toString())


        return res.status(200).json(userList)

    }
    catch(error){
        console.log(error)
    }
}

const chatController = {
    create : async (req,res) => {
        return await addMessge(req,res)
    },
    get: async (req,res) => {
        return await receiveMessage(req,res)
    },
    getChatedUsers: async (req,res) => {
        return await chatUserList(req,res)
    }
}

export default chatController