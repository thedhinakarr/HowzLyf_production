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
    bioUrl: {
        type: String,
        required: false,
    },
    imageUrl:{
        type: String,
        required:false
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

userSchema.index({name: "text",userName:"text",email:"text"}, {name: "default"})

let User = mongoose.model("User",userSchema);

export default User;