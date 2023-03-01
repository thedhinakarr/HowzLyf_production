import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength: 30
    },
    userName:{
        type:String,
        required:true,
        maxlength: 30
    },
    email:{
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    userVerifyToken: {
        email: {
            type: String,
            default: null
        }
    },
    isVerified: {
        email: {
            type: Boolean,
            default: false
        }
    }
},{timestamps:true})

let User = mongoose.model("User",userSchema);

export default User;