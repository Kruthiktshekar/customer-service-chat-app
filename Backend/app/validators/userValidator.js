import User from '../models/userModel.js';

/* 
   validation for register user , here it will validate the user details username , password , phone number and name
*/
export const userRegisterSchema = {
  username: {
    exists: {
      errorMessage: 'username field is required',
    },
    notEmpty: {
      errorMessage: 'username is required',
    },
    trim: true,
    custom: {
      options: async function (value) {
        try {
          const user = await User.findOne({ username: value });
          if (user) {
            throw new Error('username is already exists');
          }
          return true;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },
  },
  password: {
    exists: {
      errorMessage: 'password field is required',
    },
    notEmpty: {
      errorMessage: 'password is required',
    },
    trim: true,
    isStrongPassword: {
      options: {
        minLength: 8,
        maxLength: 128,
        minLowerCase: 1,
        minUpperCase: 1,
        minSymbol: 1,
        minNumber: 1,
      },
      errorMessage:
        'password should consists of atleast one lowercase, one uppercase, one special character, one number and should be atleast 8 characters',
    },
  },
  fullname: {
    exists: {
      errorMessage: 'name field required',
    },
    notEmpty: {
      errorMessage: 'name is required',
    },
    trim: true,
  },
};

/* 
   validation for login user , here it will validate the user details email and password 
*/
export const loginUserSchema = {
  username: {
    exists: {
      errorMessage: 'username field is required',
    },
    notEmpty: {
      errorMessage: 'username is required',
    },
    trim: true,
  },
  password: {
    exists: {
      errorMessage: 'password field is required',
    },
    notEmpty: {
      errorMessage: 'password is required',
    },
    trim: true,
    isStrongPassword: {
      options: {
        minLength: 8,
        maxLength: 128,
        minLowerCase: 1,
        minUpperCase: 1,
        minSymbol: 1,
        minNumber: 1,
      },
      errorMessage:
        'password should consists of atleast one lowercase, one uppercase, one special character, one number and should be atleast 8 characters',
    },
  },
};
