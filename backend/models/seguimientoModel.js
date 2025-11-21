import mongoose from "mongoose";

const SeguimientoSchema= new mongoose.Schema({
    PacientId: {
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
    },

    Status: {
        type: Boolean,
    }
});

export default mongoose.model("seguimientoMedico", SeguimientoSchema)