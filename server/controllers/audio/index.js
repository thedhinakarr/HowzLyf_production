//Here is where the fun begins.
import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import User from "../../models/Users/index.js";
import Audio from "../../models/Audio/index.js";
import { isAuthenticated } from "../../middleware/auth/index.js";


const router = express.Router();

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, "./assets/");
    },
  
    filename: function (req, file, cb) {
      let ext = file.mimetype.split("/")[1];
      cb(null, file.fieldname + "-" + Date.now() + "." + "wav");
    },
  
  });
  
  const upload = multer({ storage: storage });


router.get("/viewAll",isAuthenticated,async (req,res)=>{
    try {
        let x = await Audio.find()
        res.status(200).json({ message: "Task successfully added." , x});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Interval server error"});
    }

})  
  

router.post("/upload", isAuthenticated , upload.single('audio') , async (req, res) => {
    try {
        // console.log(req.file);
        let findEmail = await User.findOne({ _id: req.payload.id });
        if (!findEmail) {
            return res.status(400).json({ message: "Unauthorized" });
        }

        let filename = req.file.filename;
        let audioUrl = `/api/audio/assets/${filename}`;
        let id = findEmail._id;

        let audio = new Audio({
            filename,
            audioUrl,
            producedBy:id,
        })
        
        await audio.save();
        res.status(200).json({ message: "Audio successfully uploaded."})

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/viewByUser", isAuthenticated , async (req, res) => {
    try {
        let findEmail = await User.findOne({ _id: req.payload.id });
        if (!findEmail) {
            return res.status(400).json({ message: "Unauthorized" });
        }
        let userID= findEmail._id;
       let x = await Audio.find({producedBy:userID})
      res.status(200).json({ message: "Task successfully added.",result:x})

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
})


router.get("/api/audio/assets", express.static("assets"));

export default router;