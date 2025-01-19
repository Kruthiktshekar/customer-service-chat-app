

import { CONTROLLERS } from "./helper/constants.js";
import { createController } from "./helper/createController.js";
import { errorCatchBlock } from "./helper/errorCatch.js";
import { getController } from "./helper/getController.js";

const { 
    CHAT
} = CONTROLLERS;

/**
 * This function is used to create a chat record in the table and return the successfull response
 * @param {Object} req - request function of the controller, which contains request data
 * @param {Object} res - response function of the controller
 * @returns 
 */
const createChat = async(req,res) => {
    try{
        const chatData = await createController(req,res, CHAT)
        if(chatData){
            return res.status(201).json({msg:'message added'})
        }
    }
    catch(error) {
        console.log("[ERROR] Error in create chat", error, error.message)
        return errorCatchBlock(error,res)
    }
}

/**
 * This function is used to fetch chat messages and return successfull response
 * @param {Object} req - request function of the controller, which contains request data
 * @param {Object} res - response function of the controller
 * @returns 
 */
const getChat = async(req,res) => {
    try{

        const chatData = await getController(req,res,CHAT)
        return res.status(200).json(chatData)
    }
    catch(error) {
        console.log("[ERROR] Error in fetching messages", error, error.message)
        return errorCatchBlock(error,res)
    }
}

export const chatController = {
    create : async(req,res) => {
        return await createChat(req,res)
    },
    get : async(req,res) => {
        return await getChat(req,res)
    }
}

