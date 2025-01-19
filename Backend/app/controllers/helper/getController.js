import Chat from '../../models/chatModel.js';
import User from '../../models/userModel.js';
import { USER_ERROR_MESSAGE, CONTROLLERS } from './constants.js';
import { CustomError } from './errorCatch.js';

const { INTERNAL_SERVER_ERROR, CHATS_NOT_FOUND,USER_NOT_FOUND} = USER_ERROR_MESSAGE;

const { USER, CHAT
 } = CONTROLLERS;

/**
 * This function is used to fetch single user || chat message and returns successfull response
 * @param {Object} req - request function of the controller, which contains request data
 * @param {String} controllerName - it would be USER, CHAT
 * @returns
 */
export const getController = async (req, res, controllerName) => {
  try {
    switch (controllerName) {
      case USER: {
        const id = req.userId;
        const user = await User.findById(id);
        if (!user) {
          throw new CustomError(404, USER_NOT_FOUND);
        }
        return user;
      }
      case CHAT: {
        const from = req.userId;
        const { to } = req.body;
        const user = await User.findById(from);
        let messages;
        if (user.role == 'agent') {
          messages = await Chat.find({
            users: {
              $all: [from, to],
            },
          }).sort({ updatedAt: 1 });
        } else if (user.role == 'user') {
          messages = await Chat.find({
            users: from,
          }).sort({ updatedAt: 1 });
        }
        const projectedMsgs = messages.map((msg) => {
          return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
          };
        });
        if(!projectedMsgs){
          throw new CustomError(404,  CHATS_NOT_FOUND);
        }
        return projectedMsgs
      }
    }
  } catch (error) {
    throw new CustomError(
      error.statusCode ?? 500,
      error.message ?? INTERNAL_SERVER_ERROR
    );
  }
};
