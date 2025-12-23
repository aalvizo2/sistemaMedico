import seguimientoModel from "../models/seguimientoModel.js";
import userModel from "../models/userModel.js";

export const getSeguimientoMedico= async(req, res) => {
    try{
      const seguimiento= await seguimientoModel.find();
      const Data= seguimiento.map(item => {
        return{
            ...item.toObject(),
            Id: item.id.toString(),
            _id: undefined
        }
      });
      res.status(200).json({Data});
    }catch(error){
        res.status(500).json({Message: 'Error al obtener los datos',  error})
    }
};

export const newSeguimiento= async(req, res)=> {
    try{
        const newData= req.body;
        const paciente= await userModel.findById(newData.PatientId);
        newData.Patient= paciente.Name + ' ' + paciente.PaternalSurname + ' ' + paciente.MaternalSurname;
        console.log('data que se recibe en el backend', newData);

        const newSeguimiento= new seguimientoModel(newData);
        await newSeguimiento.save();

        res.status(200).send({Message: 'Operación realizada con éxito'})

    }catch(error){
        res.status(500).json({Message: 'Error al agregar los datos', error})
    }
};

export const updateSeguimiento= async(req, res)=> {
    try{
        const {Id} = req.params;
        const newData= req.body;
        
        const Data= await seguimientoModel.findByIdAndUpdate(Id, newData);

        if(Data){
            res.status(200).json({Message: 'Operación realizada con éxito'});
        }

    }catch(error){
        res.status(500).json({Message: 'Error al actualizar los datos', error})
    }
};

export const deleteSeguimiento = async (req, res) => {
    try {
        const { Id } = req.params;

        const eliminar = await seguimientoModel.findByIdAndDelete(Id);

        if (eliminar) {
            res.status(200).json({ Message: 'Operación realizada con éxito' });
        } else {
            res.status(404).json({ Message: 'No se encontró el documento' });
        }
    } catch (error) {
        res.status(500).json({ Message: 'Error al eliminar los datos', error });
    };

    
};

export const getSeguimientoByPatientId= async(req, res) => {
        try{
            const {PatientId} = req.params;
            const seguimiento= await seguimientoModel.find({PatientId: PatientId});
            const Data= seguimiento.map((item) =>{
                return{
                    ...item.toObject(),
                    Id: item._id.toString(),
                    _id: undefined,
                    __v: undefined
                }
            })
            if(seguimiento){
                res.status(200).json({Data: Data});
            }
        

        }catch(error){
            res.status(500).json({Message: 'Error al obtener los datos',  error})
        }
    }
