import mongoose from "mongoose";

const configDb = async () => {
    try{
        const response = await mongoose.connect(process.env.MONGODB_URL)
        if(response)
        console.log('db is connected successfully')
    }
    catch(err){
        console.error('error while connecting db' ,err)
    }
}

export default configDb