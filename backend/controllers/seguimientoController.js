import seguimientoModel from "../models/seguimientoModel.js";


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
        console.log(Id, 'Id que se envia', newData)
        //Actualizamos 
        const Data= await seguimientoModel.findOneAndUpdate(
            { _id: Id },   // buscar por _id real
            newData,
            { new: true }
        );
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
    }
}
