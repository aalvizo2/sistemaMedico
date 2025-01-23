import userModel from "../models/userModel.js";


export const getAllUsers = async(req, res) => {
    try{
        const Data= await userModel.find();
        res.status(200).json(Data);
        
    }catch(error){
        res.status(500).json({Message: "Error al obtener los usuarios", error})
    }
}

export const createUser= async(req, res) => {
    try{
        const newData= req.body;
        const newUser = new userModel(newData);
        
        await newUser.save();
        res.status(200).send({Message: "Operación realizada con éxito"});
    }catch(error){
        res.status(500).send({Message: "Error al crear usuario", error})
    }
}