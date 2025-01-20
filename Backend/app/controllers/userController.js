import { loginController } from '../middlewares/loginController.js';
import { CONTROLLERS } from './helper/constants.js';
import { createController } from './helper/createController.js';
import { deleteController } from './helper/deleteController.js';
import { errorCatchBlock } from './helper/errorCatch.js';
import { getAllController } from './helper/getAllController.js';
import { getController } from './helper/getController.js';
import { updateController } from './helper/updateController.js';

const { USER, AGENT } = CONTROLLERS;

/**
 * This function is used to create a user record in the table and return the successfull response
 * @param {Object} req - request function of the controller, which contains request data
 * @param {Object} res - response function of the controller
 * @returns
 */
const createUser = async (req, res) => {
  try {
    const userData = await createController(req, res, USER);
    return res.status(201).json(userData);
  } catch (error) {
    console.log('[ERROR] Error in create user', error, error.message);
    return errorCatchBlock(error, res);
  }
};

/**
 * This function is used to login a user and return the token
 * @param {Object} req - request function of the controller, which contains request data
 * @param {Object} res - response function of the controller
 * @returns
 */
const loginUser = async (req, res) => {
  try {
    const token = await loginController(req, res);
    return res.status(200).json({ token });
  } catch (error) {
    console.log('[ERROR] Error in login user function', error, error.message);
    return errorCatchBlock(error, res);
  }
};

/**
 * This function is used to fetch single user and return successfull response
 * @param {Object} req - request function of the controller, which contains request data
 * @param {Object} res - response function of the controller
 * @returns
 */
const getUser = async (req, res) => {
  try {
    const userData = await getController(req, res, USER);
    return res.status(200).json(userData);
  } catch (error) {
    console.log('[ERROR] Error in fetching user', error, error.message);
    return errorCatchBlock(error, res);
  }
};

const getSingleAgent = async (req, res) => {
  try {
    const agentData = await getController(req, res, AGENT);
    return res.status(200).json(agentData);
  } catch (error) {
    console.log('[ERROR] Error in fetching onwer', error, error.message);
    return errorCatchBlock(error, res);
  }
};

/**
 * This function is used to fetch all users and return successfull response
 * @param {Object} req - request function of the controller, which contains request data
 * @param {Object} res - response function of the controller
 * @returns
 */
const getAllUser = async (req, res) => {
  try {
    const userData = await getAllController(req, res, USER);
    return res.status(200).json(userData);
  } catch (error) {
    console.log('[ERROR] Error in fetching users', error, error.message);
    return errorCatchBlock(error, res);
  }
};

/**
 * This function is used to fetch all agents and return successfull response
 * @param {Object} req - request function of the controller, which contains request data
 * @param {Object} res - response function of the controller
 * @returns
 */
const getAllAgents = async (req, res) => {
  try {
    const userData = await getAllController(req, res, AGENT);
    return res.status(200).json(userData);
  } catch (error) {
    console.log('[ERROR] Error in fetching agents', error, error.message);
    return errorCatchBlock(error, res);
  }
};

/**
 * This function is used to update user data and return new data as a response
 * @param {Object} req - request function of the controller, which contains request data
 * @param {Object} res - response function of the controller
 * @returns
 */
const updateUser = async (req, res) => {
  try {
    const userData = await updateController(req, res, USER);
    return res.status(200).json(userData);
  } catch (error) {
    console.log('[ERROR] Error in update user', error, error.message);
    return errorCatchBlock(error, res);
  }
};

/**
 * This function is used to update user role to agent and return new data as a response
 * @param {Object} req - request function of the controller, which contains request data
 * @param {Object} res - response function of the controller
 * @returns
 */
const updateUserRole = async (req, res) => {
  try {
    const agentData = await updateController(req, res, AGENT);
    return res
      .status(200)
      .json({ agentData, message: 'user updated as owner' });
  } catch (error) {
    console.log('[ERROR] Error in update user role', error, error.message);
    return errorCatchBlock(error, res);
  }
};

/**
 * This function is used to delete a user and agent
 * @param {Object} req - request function of the controller, which contains request data
 * @param {Object} res - response function of the controller
 * @returns
 */
const deleteUser = async (req, res) => {
  try {
    const userData = await deleteController(req, res, USER);
    return res.status(200).json(userData);
  } catch (error) {
    console.log('[ERROR] Error in deleting user', error, error.message);
    return errorCatchBlock(error, res);
  }
};

export const userController = {
  create: async (req, res) => {
    return await createUser(req, res);
  },
  login: async (req, res) => {
    return await loginUser(req, res);
  },
  get: async (req, res) => {
    return await getUser(req, res);
  },
  getAgent: async (req, res) => {
    return await getSingleAgent(req, res);
  },
  getAll: async (req, res) => {
    return await getAllUser(req, res);
  },
  getAgents: async (req, res) => {
    return await getAllAgents(req, res);
  },
  update: async (req, res) => {
    return await updateUser(req, res);
  },
  delete: async (req, res) => {
    return await deleteUser(req, res);
  },
  updateUser: async (req, res) => {
    return await updateUserRole(req, res);
  },
};
