import express from "express";
import config from "config";
import bcrypt from "bcrypt";
import multer from "multer";

import User from "../../models/Users/index.js";
import sendMail from "../../utils/mailer.js";
import { registerValidations, loginValidations, errorMiddleWare } from "../../middleware/validations/index.js";
import { randomString } from "../../utils/randomString.js";
import { generateToken } from "../../middleware/auth/index.js";
import { isAuthenticated } from "../../middleware/auth/index.js";

const router = express.Router();
let URL = config.get("URL");

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, "./assets/profilePictures/");
    },
  
    filename: function (req, file, cb) {
      let ext = file.mimetype.split("/")[1];
      cb(null, file.fieldname + "-" + Date.now() + "." + ext);
    },
  
});
  
const upload = multer({ storage: storage });

router.post("/register", registerValidations(), errorMiddleWare, async (req, res) => {
    try {
        let {  name, userName, email, password } = req.body;

        console.log(req.body)

        let findEmail = await User.findOne({ email: req.body.email });

        if (findEmail) {
            return res.status(409).json({ error: "User already exists" });
        }

        let hashedPassword = await bcrypt.hash(password, 12);

        let userVerifyToken = {
            email: randomString(20),
            phone: randomString(20)
        }

        let user = new User({
            name,
            userName,
            email,
            password:hashedPassword,
            userVerifyToken
        });

        console.log(user);

        await user.save();

        // await sendMail({
        //     text: `Use this link to verify your email: \n 
        //     ${URL}/api/user/verify/email/${userVerifyToken.email}`,
        //     subject: `Email verification`,
        //     receiver: email
        // });

        return res.status(200).json({ message: "User registered successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal server error" });
    }
});

router.get("/verify/email/:emailtoken", async (req, res) => {
    try {
        let token = req.params.emailtoken;
        
        let findUser = User.findOne({ "userVerifyToken.email": token })
      
        if (!findUser) {
            return res.status(400).json({ error: "User does not exist" });
        }

        await User.updateOne(
            { "userVerifyToken.email": token },
            { $set: { "isVerified.email": true } }
        );

        return res.status(200).json({ success: "Email verified Successfully, Login now." });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/resend/email",async (req, res) => {
    try {
        let email = req.body.email;
        let findUser = await User.findOne({email:email});
        if(!findUser){
            return res.status(401).json({message:"User does not exist"});
        }

        let token = findUser.userVerifyToken.email;
       

        await sendMail({
            text: `Use this link to verify email: \n
            ${URL}/api/user/verify/email/${token}`,
            subject:`Email verification`,
            receiver:email
        });

        return res.status(200).json({message: "Verification link to email sent succesfully."})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server error"});
    }
});

router.post("/login", loginValidations(), errorMiddleWare, async (req, res) => {
    try {
        let { email, password } = req.body;
        
        let findEmail = await User.findOne({ email: email });

        if (!findEmail) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        // if (!findEmail.isVerified.email) {
        //     return res.status(401).json({ error: "Please verify your email first." })
        // }
        let match = await bcrypt.compare(password, findEmail.password)

        if (!match) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        let payload = {
            id: findEmail.id,
            userName:findEmail.userName,
        }

        let token = generateToken(payload);

        return res.status(200).json(
            {
                message: "Login Successful",
                token,
                email: findEmail.email
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/deleteAccount",isAuthenticated,async (req,res)=>{
    try {
        console.log(req.payload);
        let foundUser= await User.findOne({_id:req.payload.id});
        
        console.log(foundUser);

        let deletedsUser = await User.deleteOne({_id :foundUser._id})
        
        res.status(200).json({"message":"User successfully deleted."})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }

} )

router.get("/getUserDetailsByToken",isAuthenticated,async (req,res)=>{
    try {
        console.log(req.payload);
        let foundUser = await User.findOne({_id:req.payload.id});

        if(!foundUser){
            res.status(404).json({"message":"User not found"})
        }
        else {
            res.status(200).json({"user":foundUser})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"Internal server error"});
    }
})

router.get("/getUserDetailsById/:id",isAuthenticated,async (req,res)=>{
        try {
            let token = req.params.id;
            console.log(token);
            let foundUser = await User.findOne({_id:token});
            if(!foundUser){
                res.status(404).json({"Message":"User not found"});
            }
            else{
                res.status(200).json({"user":foundUser})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({"message":"Internal server error"})
        }
})

router.get("/getUserDetailsBySearch/:search",isAuthenticated,async (req,res)=>{
    try {
        let token = req.params.search;
        console.log(token);
        let foundUser = await User.findOne({ $or: [ { userName: token }, { name: token }, {email:token} ] });
        if(!foundUser){
            res.status(404).json({"Message":"User not found"});
        }
        else{
            res.status(200).json({"user":foundUser})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"Internal server error"})
    }
})

router.post("/editUserProfile",isAuthenticated,upload.single('picture'),async (req,res)=>{
    try {
        console.log(req.payload);

        let foundUser= await User.findOne({_id:req.payload.id});
        if(!foundUser){
            res.status(404).json({"message":"User not found"});
        }

        let filename = req.file.filename;
        let imageUrl = `/api/user/pic/${filename}`;

        let updatedImg = await User.updateOne({_id:req.payload.id},{$set:{"imageUrl":imageUrl}})
        console.log(updatedImg);
        let updatedUser= await User.findOne({_id:req.payload.id});
        res.status(200).json({"message":"Image updated successfully",updatedUser})

    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"Internal server error"});
    }
})

const bioStorage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, "./assets/bios/");
    },
  
    filename: function (req, file, cb) {
      let ext = file.mimetype.split("/")[1];
      cb(null, file.fieldname + "-" + Date.now() + "." + "wav");
    },
  
});
  
const bioUpload = multer({ storage: bioStorage });


router.post("/editUserBio",isAuthenticated,bioUpload.single('bio'),async (req,res)=>{
    try {
        console.log(req.payload);

        let foundUser= await User.findOne({_id:req.payload.id});
        if(!foundUser){
            res.status(404).json({"message":"User not found"});
        }

        let filename = req.file.filename;
        let bioUrl = `/api/user/bio/${filename}`;

        let updatedBio = await User.updateOne({_id:req.payload.id},{$set:{"bioUrl":bioUrl}})
        console.log(updatedBio);
        let updatedUser= await User.findOne({_id:req.payload.id});
        res.status(200).json({"message":"Bio updated successfully",updatedUser})

    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"Internal server error"});
    }
})

router.post("/editUserName",isAuthenticated,async (req,res)=>{
    try {
        console.log(req.payload);

        let foundUser= await User.findOne({_id:req.payload.id});
        if(!foundUser){
            res.status(404).json({"message":"User not found"});
        }

        let updatedUName = await User.updateOne({_id:req.payload.id},{$set:{"userName":req.body.userName}})
        console.log(updatedUName);
        let updatedUser= await User.findOne({_id:req.payload.id});
        res.status(200).json({"message":"uname updated successfully",updatedUser})

    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"Internal server error"});
    }
})

router.get("/search/:query", async (req, res) => {
    const word = req.params.query;
    let users = await User.find({ $text: { $search: word } });
    return res.status(200).json(users);
  });

export default router;


