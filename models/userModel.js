import mongoose from "mongoose";

const User = mongoose.Schema({
    username: {type:String, unique:true, required:true},
    password: {type:String, required:true},
    role: {type:String, ref:"Role"}
})

export default mongoose.model("User", User) 