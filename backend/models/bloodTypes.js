import mongoose from "mongoose";


const bloodTypeSchema= new mongoose.Schema({
    BloodType: {
        type: String
    },

    RHFactor: {
        type: String,
    }
});


export default mongoose.model("BloodTypes", bloodTypeSchema);