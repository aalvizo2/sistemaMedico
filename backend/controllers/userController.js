import userModel from "../models/userModel.js";
import path from "path";



export const getAllUsers = async(req, res) => {
    try{
        const users= await userModel.find({State: true});
        const Data= users.map(item => {
            return{
                ...item.toObject(),
                Id: item._id.toString(),
                _id: undefined,
                
            }
        });
        res.status(200).json(Data);
        
    }catch(error){
        res.status(500).json({Message: "Error al obtener los usuarios", error});
        console.error(error)
    }
}

export const createUser = async (req, res) => {
    try {
        const newData = req.body;
        let fileInfo = null;

        // Verificar si se subió archivo
        if (req.file) {
            fileInfo = {
                Path: `images/${req.file.filename}`, // archivo real guardado
                Extension: path.extname(req.file.originalname).substring(1)
            };
            newData.Files = [fileInfo];
        } else {
            console.log("No se recibió archivo");
        }

        console.log("Datos del usuario:", newData);

        const newUser = new userModel(newData);
        await newUser.save();

        res.status(200).send({ Message: "Operación realizada con éxito" });
    } catch (error) {
        console.error("Error en createUser:", error);
        res.status(500).send({
            Message: "Error al crear usuario",
            error: error.message
        });
    }
};


export const editUser = async (req, res) => {
    try {
         const {id}= req.params;
         const newData= req.body;

         //Actualizamos
         const Data= await userModel.findByIdAndUpdate(
            id,
            newData,
            {new: true}
         );

         if(!Data){
            return res.status(404).json({Message: "El Usuario no existe"});
         }
         res.status(200).json({Message: "Operación realizada con éxito"});
    } catch (error) {
        console.error(error);
    }
};

export const toggleUserState= async(req, res) => {
    try{
        const {Id} = req.params;
        const user= await userModel.findById(Id);


        user.State = !user.State;

        await user.save();

        res.status(200).json({Message: "Operación realizada con éxito"});

    }catch(error){
       console.log(error);

    }
};

export const activateUser= async(req, res) => {
    const {Id}= req.params;
    const user= await userModel.findById(Id);
    

    if(user){
        user.State = true;
        user.State = user.State;
        await user.save();
        res.status(200).json({Message: "Operación realizada con éxito"});
    }else{
        res.status(404).json({Message: "Usuario no encontrado"});
    }


   
};

export const getAllDeletedUsers= async(req, res) => {
    try{
      const users= await userModel.find({State: false});

      const Data= users.map(item => {
        return{
            ...item.toObject(),
            Id: item._id.toString(),
            _id: undefined,
            
        }
    });
    

    return res.status(200).json(Data);

    }catch(error){
        res.status(500).json({Message: "Error al obtener los usuarios", error});
        console.error(error)
    }
};


export const getUserByName = async(req, res) => {
    const{Name}= req.params;
    console.log(Name)
    const result= await userModel.findById(Name);
    
    const Data={
        ...result.toObject(),
        Id: result._id.toString(),
        _id: undefined
    }
    console.log(Data)

    res.status(200).json(Data)
}
