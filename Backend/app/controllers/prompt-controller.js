import Prompt from "../models/prompt-model.js";


const createPrompt = async (req,res)  => {
   try{
        const data = req.body
        const newPrompt = await Prompt.create(data)
        return res.status(201).json(newPrompt)
   }
   catch(error){
    return res.status(500).json(error)
   }
}

const getPrompts = async (req,res) => {
    try{
        const Prompts = await Prompt.find()
        return res.status(200).json(Prompts)
    }
    catch(error) {
        return res.status(500).json(error)
    }
}

const updatePrompts = async(req,res) => {
    const id = req.params.id
    const data = req.body
    try{
        const prompt = await Prompt.findByIdAndUpdate(id , data , {new:true})
        if(!prompt){
            res.status(404).json('prompt not found')
        }
        res.status(200).json(prompt)
    }
    catch(error) {
        console.log(error)
        throw error
    }
}

const deletePrompt = async(req,res) => {
    const id = req.params.id
    console.log(id)
    try{
        const prompt = await Prompt.findByIdAndDelete(id)
        console.log(prompt, id)
        if(!prompt){
            res.status(404).json('prompt not found')
        }
        res.status(200).json(prompt)
    }
    catch(error) {
        console.log(error)
        throw error
    }
}

const promptController = {
    create : async (req,res) => {
        return await createPrompt(req,res)
    },
    get : async (req,res) => {
        return await getPrompts(req,res)
    },
    update : async (req,res) => {
        return await updatePrompts(req,res)
    },
    delete : async (req,res) => {
        return await deletePrompt(req,res)
    }
}

export default promptController