import { Server } from 'socket.io';
import User from '../app/models/userModel.js';
import Prompt from '../app/models/promptModel.js';
import Chat from '../app/models/chatModel.js';
import { CONTROLLERS } from '../app/controllers/helper/constants.js';
const { SYSTEMID } = CONTROLLERS;

const configScoket = () => {
  let io = new Server(3131, {
    cors: {
      origin: 'http://localhost:3000',
    },
    connectionStateRecovery: {},
  });
  const userSocketMap = new Map();
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('add-user', async (userId) => {
      userSocketMap.set(userId, socket.id);
      const data = { isOnline: true, isBusy: false };
      await User.findByIdAndUpdate(userId, data, { new: true });
    });

    // Handle user prompt click
    socket.on('prompt-clicked', async (data) => {
      const prompt = await Prompt.findById(data.promptId);
      const systemId = SYSTEMID;
      if (prompt) {
        const formData = {
          message: { text: prompt.message },
          users: [systemId, data.to],
          sender: systemId,
          isSystem: true,
        };
        Chat.create(formData);
        socket.emit('receive-answer', prompt.message);
      }
    });

    socket.on('request-agent', async (userId) => {
      const availableAgent = await User.findOne({
        role: 'agent',
        isOnline: true,
        isBusy: false,
      });
      if (availableAgent) {
        availableAgent.isBusy = true;
        await availableAgent.save();
        console.log(availableAgent);

        console.log(availableAgent._id, 'agent user id');
        const agentId = availableAgent._id.toString();
        const recipientSocketId = userSocketMap.get(agentId);
        io.to(recipientSocketId).emit('new-chat', userId);
        socket.emit('agent-assigned', availableAgent);
      } else {
        socket.emit(
          'no-agents',
          'No agents available at the moment... please try later...'
        );
      }
    });

    socket.on('send-msg', (data) => {
      console.log(data, 'from socket');
      const recipientSocketId = userSocketMap.get(data.to);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('receive-msg', data);
      } else {
        console.log('User is not connected');
      }
    });

    socket.on('logout', (id) => {
      (async () => {
        const agent = await User.findById(id);
        if (agent) {
          agent.isOnline = false;
          agent.isBusy = false;
          await agent.save();
        }
      })();
    });

    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
    });
  });
};

export default configScoket;
