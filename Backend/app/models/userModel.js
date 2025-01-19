import mongoose from "mongoose";

const {Schema,model} = mongoose

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    fullname: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'agent', 'system'],
      default: 'user' 
    },
    isOnline: {
      type: Boolean,
      default: false 
    },
    isBusy: {
      type: Boolean,
      default: false 
    }
  }, { timestamps: true })

const  User = model('User' , userSchema)
export default User