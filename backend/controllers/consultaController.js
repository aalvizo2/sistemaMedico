import consultas from '../models/consultaModel.js';


export const findConsulta = async (req, res) => {
  console.log("req.params:", req.params); // Verifica qué se recibe en los parámetros
  const { userId } = req.params;
  console.log("userId recibido:", userId); // Verifica si userId es undefined

  try {
      const Data = await consultas.find({ userId });

      if (!Data) {
          return res.status(404).json({ message: "No se encontraron consultas" });
      }

      res.status(200).json(Data);
  } catch (error) {
      console.error("Error en findConsulta:", error); // Loguea el error si ocurre
      res.status(500).send(error);
  }
};

export const newConsulta= async(req, res) => {
  
  try{
    const newData= req.body;
    
    const newConsult= new consultas(newData);

    await newConsult.save();

    res.status(200).send({Message: 'Operación realizada con éxito'});

  }catch(error){
    res.status(500).send({Message: "Error al crear la consulta", error})
  }
};