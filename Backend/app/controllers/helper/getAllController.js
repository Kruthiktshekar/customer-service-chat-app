import Prompt from '../../models/promptModel.js';
import User from '../../models/userModel.js';
import { USER_ERROR_MESSAGE, CONTROLLERS } from './constants.js';
import { CustomError } from './errorCatch.js';

const { INTERNAL_SERVER_ERROR, USERS_NOT_FOUND, PROMPTS_NOT_FOUND } =
  USER_ERROR_MESSAGE;

const { USER, PROMPT, AGENT } = CONTROLLERS;

/**
 * This function is used to fetch all user || prompts || agents and returns successfull response
 * @param {String} controllerName - it would be USER, PROMPT , AGENT
 * @returns
 */
export const getAllController = async (req, res, controllerName) => {
  try {
    switch (controllerName) {
      case USER: {
        const users = await User.find({ role: 'user' });
        if (!users) {
          throw new CustomError(404, USERS_NOT_FOUND);
        }
        return users;
      }
      case PROMPT: {
        const prompts = await Prompt.find();
        if (!prompts) {
          throw new CustomError(404, PROMPTS_NOT_FOUND);
        }
        return prompts;
      }
      case AGENT: {
        const agents = await User.find({ role: 'agent' });
        if (!agents) {
          throw new CustomError(404, USERS_NOT_FOUND);
        }
        return agents;
      }
    }
  } catch (error) {
    throw new CustomError(
      error.statusCode ?? 500,
      error.message ?? INTERNAL_SERVER_ERROR
    );
  }
};
