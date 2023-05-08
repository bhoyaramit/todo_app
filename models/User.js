import mongoose from "mongoose";

export const schema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const User =  mongoose.model("User",schema);
export default  User;