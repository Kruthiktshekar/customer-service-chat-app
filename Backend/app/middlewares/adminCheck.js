import User from '../models/userModel.js';

export const isAdmin = async (req, res, next) => {
  const id = req.userId;
  const user = await User.findById(id);
  if (user.role === 'admin') {
    next();
  } else {
    return res
      .status(403)
      .json({ message: 'Access denied, only admin can perform this action' });
  }
};
