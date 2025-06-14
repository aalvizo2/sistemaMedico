import loginModel from '../models/loginModel.js';
import users from '../models/loginModel.js';
import bcrypt from 'bcrypt'



export const loginUser = async (req, res) => {
    const { Username, Password } = req.body;

    try {
        // Buscar al usuario por el nombre de usuario
        const user = await users.findOne({ Username });

        // Si no existe el usuario
        if (!user) {
            return res.status(401).json({ Message: "Usuario no encontrado" });
        }

        // Comparar la contraseña ingresada con la almacenada
        const isMatch = await bcrypt.compare(Password, user.Password);

        if (!isMatch) {
            return res.status(401).json({ Message: "Contraseña incorrecta" });
        }

        // Usuario autenticado correctamente
        res.status(200).json({
            user: {
                Username: user.Username,
                Role: user.Role,
            },
        });

    } catch (error) {
        res.status(500).json({ Message: "Error en el servidor", error });
    }
};

export const createUser= async(req, res)=> {
    try{
        const data= req.body;

        const hashedPassword= await bcrypt.hash(data.Password, 10);
        data.Password= hashedPassword;

        const newData= new loginModel(data);

        await newData.save(data);
        res.status(200).send({Message: 'Operación realizada con éxito'})
        

    }catch(error){
        res.status(500).send({Message: 'Error al crear el usuario', error})
    }
};

export const getAllUsers= async(req, res)=>{
    try{
        const Data= await users.find();
        res.status(200).json(Data);

    }catch(error){
        res.status(500).send({Message: 'Error de conexión', error})
    }
}