import BloodTypeModel from '../models/bloodTypes.js';

export const newBloodType= async(req, res) => {
    const {BloodType}= req.body;
    try{
        const existingType= await BloodTypeModel.findOne({BloodType});
        if(existingType){
            res.status(500).send({Message: 'El tipo de Sangre ingresado ya existe'});
        }else{
            const data= req.body;
            const newData= new BloodTypeModel(data);

            await newData.save(data);
            res.status(200).send({Message: 'Operación realizada con éxito'});
        }

    }catch(error){
        res.statur(500).send({Message: 'Hubó un error al obtener los datos', error});
    }
};

export const getBloodTypes= async(req, res) => {
    try{
        const bloodTypes= await BloodTypeModel.find();

        const Data= bloodTypes.map(item => {
            return{
                ...item.toObject(),
                Id: item._id.toString(),
                _id: undefined,
                __v: undefined,
            }
        })
        res.status(200).json(Data);


    }catch(error){
       res.status(500).send({Message: 'Error al obtener los datos', error});
    } 
};

export const editBloodType= async(req, res) => {
    

    try{
       const {Id}= req.params;
       const newData= req.body;

       const Data= await BloodTypeModel.findByIdAndUpdate(
    
            Id,
            newData,
            {
                new: true,
            }
         
       );


       res.status(200).json({Message: "Operación realizada con éxito"});
    }catch(error){
       console.error(error);
    }

    
};

export const deleteBloodType= async(req, res) => {
    try{
       const {Id}= req.params;

       await BloodTypeModel.findByIdAndDelete(Id);

       res.status(200).send({Message: 'Operación realizada con éxito'});

    }catch(error){
        res.status(500).send({Message: 'Error al eliminar', error})
    }
}