import Chat from '../../models/chatModel.js';
import Prompt from '../../models/promptModel.js';
import User from '../../models/userModel.js';
import bcrypt from 'bcryptjs';
import { USER_ERROR_MESSAGE, CONTROLLERS } from './constants.js';
import { CustomError } from './errorCatch.js';
import { validationResult } from 'express-validator';

const { INTERNAL_SERVER_ERROR, SOMETHING_WENT_WRONG } = USER_ERROR_MESSAGE;

const { USER, CHAT, PROMPT, SYSTEMID } = CONTROLLERS;

/**
 * This function is used to create user || prompt || new chat message and returns successfull response
 * @param {Object} req - request function of the controller, which contains request data
 * @param {Object} res - response function of the controller
 * @param {String} controllerName - it would be USER, PROMPT , CHAT
 * @returns
 */
export const createController = async (req, res, controllerName) => {
  try {
    switch (controllerName) {
      case USER: {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new CustomError(401, errors.array()[0].msg);
        }
        const data = req.body;
        console.log(data);
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(data.password, salt);
        data.password = hash;
        const userCount = await User.countDocuments();
        if (userCount === 0) {
          data.role = 'admin';
          const user = await User.create(data);
          return res.status(201).json(user);
        } else {
          const user = await User.create(data);
          return user;
        }
      }
      case CHAT: {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() });
        // }
        const systemId = SYSTEMID;
        const { message } = req.body;
        const to = req.body.to ? req.body.to : systemId;
        const from = req.userId;
        const formData = {
          message: { text: message },
          users: [from, to],
          sender: from,
        };
        const data = await Chat.create(formData);
        if (!data) {
          throw new CustomError(404, SOMETHING_WENT_WRONG);
        }
        return data;
      }
      case PROMPT: {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() });
        // }
        const data = req.body;
        const newPrompt = await Prompt.create(data);
        if (!newPrompt) {
          throw new CustomError(404, SOMETHING_WENT_WRONG);
        }
        return newPrompt;
      }
    }
  } catch (error) {
    console.log('[ERROR] in createController', error);
    throw new Error({ statusCode: 500, message: INTERNAL_SERVER_ERROR });
  }
};
