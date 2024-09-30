import  User  from "../models/user-model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const createUser = async(req,res) => {

   try{
    const data = req.body
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(data.password , salt)
    data.password = hash
    const userCount = await User.countDocuments()
    console.log(userCount)
    if(userCount === 0) {
      data.role = 'admin'
      const user = await User.create(data)
      return res.status(201).json(user)
    }else{
      const user = await User.create(data)
      return res.status(201).json(user)
    }
   }
   catch(error){
     return res.status(500).json(error)
   }
}

const loginUser = async(req,res) => {
  try{
    const data = req.body
    const user = await User.findOne({ username: data.username });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const passwordVerify = await bcrypt.compare(data.password, user.password);
    if (!passwordVerify) {
      return res.status(401).json({ msg: "email or password is incorrect" });
    }
    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_SCRETE, {
      expiresIn: "1d",
    });
    return res.status(200).json({ token: token });
  }
  catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

const updateUserRole = async(req,res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = 'agent';
    await user.save();

   return res.json({ message: 'User promoted to agent', user : user});
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error : error });
  }
}
// const updateUserRoleToAdmin = async(req,res) => {
//   try {
//     const userId = req.params.id;

//     const user = await User.findById(userId);
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.role = 'admin';
//     await user.save();

//     res.json({ message: 'User promoted to admin', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// }

const deleteUser = async(req,res) => {
  const id = req.params.id
  try{
    const user = await User.findByIdAndDelete(id)
    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({data:user, message:'user deleted'})
  }
  catch(error){
    console.log('error while deleting user')
    throw error
  }
}

const getUserInfo = async(req,res) => {
  const id = req.params.id
  try{
    const user = await User.findById(id)
    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user)
  }
  catch(error){
    console.log('error while deleting user')
    throw error
  }
}

const getUser = async (req, res) => {
  const id = req.userId;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json("User not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}



const getUsers = async(req,res) => {
  try{
    const users = await User.find({role: 'user'})
    if(!users){
      return res.status(404).json({ message: 'cant fetch users' });
    }
    return res.status(200).json(users)
  }
  catch(error){
    console.log('error while fetcing users')
    throw error
  }
}

const getAgents = async(req,res) => {
  try{
    const users = await User.find({role: 'agent'})
    if(!users){
      return res.status(404).json({ message: 'cant fetch agent' });
    }
    return res.status(200).json(users)
  }
  catch(error){
    console.log('error while fetcing agent')
    throw error
  }
}



const userController = {
    create : async (req,res) => {
        return await createUser(req,res)
    },
    login : async(req,res) => {
      return await loginUser(req,res)
    },
    update : async (req,res) => {
      return await updateUserRole(req,res)
   },
   delete : async (req,res) => {
    return await deleteUser(req,res)
   },
   get : async (req,res) => {
    return await getUser(req,res)
   },
   getInfo : async(req,res) => {
    return await getUserInfo(req,res)
   },
   getUsers : async (req,res) => {
    return await getUsers(req,res)
   },
   getAgents : async (req,res) => {
    return await getAgents(req,res)
   }
}

export default userController