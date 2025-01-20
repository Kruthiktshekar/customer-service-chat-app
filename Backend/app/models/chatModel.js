import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const chatSchema = new Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'User',
      required: true,
    },
    isSystem: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Chat = model('Chat', chatSchema);

export default Chat;
