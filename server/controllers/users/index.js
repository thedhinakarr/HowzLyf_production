import express from "express";
import config from "config";
import User from "../../models/Users/index.js";
import bcrypt from "bcrypt"
import sendMail from "../../utils/mailer.js";
import { registerValidations, loginValidations, errorMiddleWare } from "../../middleware/validations/index.js";
import { randomString } from "../../utils/randomString.js";
import { generateToken } from "../../middleware/auth/index.js";
import { isAuthenticated } from "../../middleware/auth/index.js";

const router = express.Router();

let URL = config.get("URL");


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

router.get("/getUserDetails",async (req,res)=>{
    try {
        console.log(req.query)
        let findUser = await User.findOne({ _id: req.query.producedBy});
        console.log(findUser)
        return res.status(200).json(findUser)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server error"});
    }
})

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

export default router;
