import express from 'express'
import cors from 'cors'
import configDb from './config/db.js'
import  route  from './config/routes.js'
import configScoket from './config/socket.js'
import dotenv from 'dotenv'


const app = express()
const port = 3090
app.use(cors())
app.use(express.json())
dotenv.config()
app.use(route)
configDb()

configScoket()

app.listen(port,()=>{
    console.log(`server started at ${port}`)
})