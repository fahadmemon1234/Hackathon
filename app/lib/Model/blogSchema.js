import mongoose from "mongoose";

let blogSchema = mongoose.Schema({
    title:String,
    description:String,
    image:String,
    userid:String
})

if( mongoose.models["blogs"]){
    delete  mongoose.models["blogs"]

}

export const blogModel = mongoose.model("blogs",blogSchema)