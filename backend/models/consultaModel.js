import mongoose from 'mongoose';

const consultaSchema= new mongoose.Schema({
    IdUser:{
        type: String,
        
    },

    Ficha: {
        type: String
    },

    List:{
        type: String
    },
    HCType:{
        type: String
    },

    BloodType: {
        type: String,
    },

    MedicalHistory:[
        {
            Date: {
                type: String,
            },

        }
    ]

});

export default mongoose.model("historiaClinica", consultaSchema);