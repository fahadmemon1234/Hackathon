import mongoose from "mongoose";

let userSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String
})

if( mongoose.models["users"]){
    delete  mongoose.models["users"]

}

export const USERMODEL = mongoose.model("users",userSchema)