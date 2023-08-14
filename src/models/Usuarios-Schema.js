import mongoose from "mongoose";
const { Schema } = mongoose;

//Definindo modelo de esquema do Usuario
const Usuario = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    datcard:{ 
        type: Date, 
        default: Date.now 
    }
});

const Users = mongoose.model('Users', Usuario);

export default Users;