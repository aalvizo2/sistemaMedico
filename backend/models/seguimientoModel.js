import mongoose from "mongoose";

const SeguimientoSchema= new mongoose.Schema({
    Patient:{
        type: String
    },
    PatientId: {
        type: String
    },

    Date:{
        type: String,
    },

    Motivation:{
        type: String
    },
    
    Observations:{
        type: String,
    },

    Treathment:{
        type: String
    },

    NextAppointment:{
        type: String
    }
});

export default mongoose.model("seguimientoMedico", SeguimientoSchema)