import mongoose from "mongoose";


const LoginSchema= new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
    },

    Password: {
        type: String,
        required: true,
        unique: true
    }, 
    Role : {
        type: String,
    }
});

export default mongoose.model("users", LoginSchema);