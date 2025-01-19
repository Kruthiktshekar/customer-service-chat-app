
import Prompt from '../../models/promptModel.js';
import User from '../../models/userModel.js';
import { USER_ERROR_MESSAGE, CONTROLLERS } from './constants.js'
import { CustomError } from './errorCatch.js';

const { INTERNAL_SERVER_ERROR,USER_NOT_FOUND, PROMPTS_NOT_FOUND } = USER_ERROR_MESSAGE;

const { USER, PROMPT
 } = CONTROLLERS;

/**
 * This function is used to delete user || prompt and returns successfull response
 * @param {Object} req - request function of the controller, which contains request data
 * @param {String} controllerName - it would be USER, PROMPT 
 * @returns
 */
export const deleteController = async (req, res, controllerName) => {
  try {
    switch (controllerName) {
      case USER: {
        const id = req.isAdmin ? req.params.id : req.userId;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
          throw new CustomError(404, USER_NOT_FOUND);
        }
        return user;
      }
      case PROMPT: {
        const id = req.params.id;
        const prompt = await Prompt.findByIdAndDelete(id);
        if (!prompt) {
          throw new CustomError(404, PROMPTS_NOT_FOUND);
        }
        return prompt;
      }
    }
  } catch (error) {
    throw new CustomError(
      error.statusCode ?? 500,
      error.message ?? INTERNAL_SERVER_ERROR
    );
  }
};
