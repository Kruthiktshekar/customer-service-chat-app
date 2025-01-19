import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { CustomError } from "../controllers/helper/errorCatch.js";
import { USER_ERROR_MESSAGE } from "../controllers/helper/constants.js";

const {EMAIL_OR_PASSWORD_INCORRECT, INTERNAL_SERVER_ERROR} = USER_ERROR_MESSAGE

/**
 * This function take user credentials and compare those credentials with db data and create token , returns that
   token as successfull response
 * @param {Object} req - request function of the controller, which contains request data
 * @param {Object} res - response function of the controller
 * @returns 
 */
   export const loginController = async (req, res) => {
    try {
    //   const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    //   }
      const data = req.body;
      const user = await User.findOne({ username: data.username });
      if (!user) {
        throw new CustomError(401, EMAIL_OR_PASSWORD_INCORRECT);
      }
      const verified = await bcrypt.compare(data.password, user.password);
      if (!verified) {
        throw new CustomError(401, EMAIL_OR_PASSWORD_INCORRECT);
      }
      const tokenData = { userId: user._id };
      const token = jwt.sign(tokenData, 'secret123', { expiresIn: '1d' });
      return token;
    } catch (error) {
      throw new CustomError(
        error.statusCode ?? 500,
        error.message ?? INTERNAL_SERVER_ERROR
      );
    }
  };