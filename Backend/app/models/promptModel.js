import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const promptSchema = new Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Prompt = model('Prompt', promptSchema);

export default Prompt;
