import express from 'express';
import { isAdmin } from '../app/middlewares/adminCheck.js';
import authenticateUser from '../app/middlewares/authMiddleware.js';
import { userController } from '../app/controllers/userController.js';
import { promptController } from '../app/controllers/promptController.js';
import { chatController } from '../app/controllers/chatController.js';
import { checkSchema } from 'express-validator';
import {
  loginUserSchema,
  userRegisterSchema,
} from '../app/validators/userValidator.js';

const route = express.Router();

// users routes
route.post(
  '/api/signup',
  checkSchema(userRegisterSchema),
  userController.create
);
route.post('/api/login', checkSchema(loginUserSchema), userController.login);
route.get('/api/user', authenticateUser, userController.get);
route.get('/api/users', authenticateUser, isAdmin, userController.getAll);
route.get('/api/agents', authenticateUser, isAdmin, userController.getAgents);
route.get('/api/user/:id', authenticateUser, isAdmin, userController.get);
route.put('/api/user/:id', authenticateUser, isAdmin, userController.update);
route.delete('/api/user/:id', authenticateUser, isAdmin, userController.delete);

route.post('/api/prompt', authenticateUser, isAdmin, promptController.create);
route.get('/api/prompt', authenticateUser, promptController.getAll);
route.put(
  '/api/prompt/:id',
  authenticateUser,
  isAdmin,
  promptController.update
);
route.delete(
  '/api/prompt/:id',
  authenticateUser,
  isAdmin,
  promptController.delete
);

route.post('/api/chat', authenticateUser, chatController.create);
route.get('/api/chat', authenticateUser, chatController.get);
// route.get('/api/chatlist',authenticateUser, chatController.getChatedUsers)

export default route;
