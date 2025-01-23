import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
    },

    PaternalSurname: {
        type: String,
    },

    MaternalSurname: {
        type: String,
    },

    Birthday: {
        type: String,  // O puedes usar Date si prefieres fechas
    },

    Age: {
        type: Number,  // Aquí sigue siendo opcional
    },

    BirthPlace: {
        type: String,
    },

    Address: {
        type: String,
    },

    ParticularPhone: {
        type: String,
    },

    CellPhone: {
        type: String,
    },

    Ocupation: {
        type: String,
    },

    State: {
        type: Boolean,
        
    }

});

export default mongoose.model("pacientes", UserSchema);
