import { USER_ERROR_MESSAGE } from './constants.js';

const { INTERNAL_SERVER_ERROR } = USER_ERROR_MESSAGE;

/**
 * This function is used to return custom errors
 * @param {Object} error - error object
 * @param {Object} res - response functionality
 * @returns
 */
export function errorCatchBlock(error, res) {
  const code = error?.statusCode ?? 500;
  const message = error?.message ?? INTERNAL_SERVER_ERROR;
  return res.status(code).json({ message });
}

export class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
