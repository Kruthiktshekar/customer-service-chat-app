import express from 'express'
import  userController  from '../app/controllers/user-controller.js'
import promptController from '../app/controllers/prompt-controller.js'
import chatController from '../app/controllers/chat-controller.js'
import { isAdmin } from '../app/middlewares/adminCheck.js'
import authenticateUser from '../app/middlewares/authMiddleware.js'


const route = express.Router()

// users routes
route.post('/api/signup',userController.create)
route.post('/api/login',userController.login)
route.get('/api/user',authenticateUser, userController.get)
route.get('/api/users',authenticateUser ,isAdmin ,userController.getUsers)
route.get('/api/agents',authenticateUser,isAdmin ,userController.getAgents)
route.get('/api/user/:id',authenticateUser,isAdmin ,userController.getInfo)
route.put('/api/user/:id',authenticateUser,isAdmin ,userController.update)
route.delete('/api/user/:id',authenticateUser,isAdmin ,userController.delete)



route.post('/api/prompt' , authenticateUser, isAdmin, promptController.create)
route.get('/api/prompt' , authenticateUser, promptController.get)
route.put('/api/prompt/:id' , authenticateUser, isAdmin, promptController.update)
route.delete('/api/prompt/:id' , authenticateUser, isAdmin, promptController.delete)



route.post('/api/chat' ,authenticateUser, chatController.create)
route.get('/api/chat' ,authenticateUser, chatController.get)
route.get('/api/chatlist',authenticateUser, chatController.getChatedUsers)





export default route
