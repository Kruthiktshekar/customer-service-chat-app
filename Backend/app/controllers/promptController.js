import { CONTROLLERS } from './helper/constants.js';
import { createController } from './helper/createController.js';
import { deleteController } from './helper/deleteController.js';
import { errorCatchBlock } from './helper/errorCatch.js';
import { getAllController } from './helper/getAllController.js';
import { updateController } from './helper/updateController.js';

const { PROMPT } = CONTROLLERS;

/**
 * This function is used to create a prompt record in the table and return the successfull response
 * @param {Object} req - request function of the controller, which contains request data
 * @param {Object} res - response function of the controller
 * @returns
 */
const createPrompt = async (req, res) => {
  try {
    const promptData = await createController(req, res, PROMPT);
    return res.status(201).json(promptData);
  } catch (error) {
    console.log('[ERROR] Error in create prompt', error, error.message);
    return errorCatchBlock(error, res);
  }
};

/**
 * This function is used to fetch all prompts and return successfull response
 * @param {Object} req - request function of the controller, which contains request data
 * @param {Object} res - response function of the controller
 * @returns
 */
const getAllPrompts = async (req, res) => {
  try {
    const promptData = await getAllController(req, res, PROMPT);
    return res.status(200).json(promptData);
  } catch (error) {
    console.log('[ERROR] Error in fetching prompts', error, error.message);
    return errorCatchBlock(error, res);
  }
};

/**
 * This function is used to update prompt data and return new data as a response
 * @param {Object} req - request function of the controller, which contains request data
 * @param {Object} res - response function of the controller
 * @returns
 */
const updatePrompt = async (req, res) => {
  try {
    const promptData = await updateController(req, res, PROMPT);
    return res.status(200).json(promptData);
  } catch (error) {
    console.log('[ERROR] Error in update prompt', error, error.message);
    return errorCatchBlock(error, res);
  }
};

/**
 * This function is used to delete a prompt
 * @param {Object} req - request function of the controller, which contains request data
 * @param {Object} res - response function of the controller
 * @returns
 */
const deletePrompt = async (req, res) => {
  try {
    const promptData = await deleteController(req, res, PROMPT);
    return res.status(200).json(promptData);
  } catch (error) {
    console.log('[ERROR] Error in deleting prompt', error, error.message);
    return errorCatchBlock(error, res);
  }
};

export const promptController = {
  create: async (req, res) => {
    return await createPrompt(req, res);
  },
  getAll: async (req, res) => {
    return await getAllPrompts(req, res);
  },
  update: async (req, res) => {
    return await updatePrompt(req, res);
  },
  delete: async (req, res) => {
    return await deletePrompt(req, res);
  },
};
