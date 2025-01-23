import users from '../models/loginModel.js';
import bcrypt from 'bcrypt';

export const loginUser= async(req, res) => {
    const {Username, Password}= req.body;
    console.log(req.body)

    try{
        const user= await users.findOne({Username});
        const password= await users.findOne({Password});

        if(user && password){
            console.log("usuario encontrado", user)
            res.status(200).json({
                user:{
                    Username: user.Username,
                    Role: user.Role
                }
            })
        }else{
            res.status(401).json({Message: "Error de autenticación"})
        }

        
    }catch(error){
        res.status(500).json({Message: "Error en el servidor", error})
    }
}