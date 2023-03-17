import express from "express";
import multer from "multer";

import User from "../../models/Users/index.js";
import Audio from "../../models/Audio/index.js";
import { isAuthenticated } from "../../middleware/auth/index.js";
import fs from "fs/promises";


const router = express.Router();

const audioStorage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, "./assets/audios/");
    },
  
    filename: function (req, file, cb) {
      let ext = file.mimetype.split("/")[1];
      cb(null, file.fieldname + "-" + Date.now() + "." + "wav");
    },
  
});
  
const uploadAudio = multer({ storage: audioStorage });

  router.post("/upload", isAuthenticated , uploadAudio.single('audio') , async (req, res) => {
    try {
        // console.log(req.file);
        let findEmail = await User.findOne({ _id: req.payload.id });
        if (!findEmail) {
            return res.status(400).json({ message: "Unauthorized" });
        }
        if(!req.file){
            return res.status(400).json({"message":"Empty shit."})
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
        res.status(200).json({ message: "Audio successfully uploaded.",audioUrl})

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
})

router.delete("/delete/:audioId",isAuthenticated,async (req,res)=>{
    try {
        console.log(req.params.audioId);
        let f = await Audio.findOne({_id: req.params.audioId});
        let filename = f.audioUrl.split("/")[3];
        let deleted = await Audio.deleteOne({_id: req.params.audioId});
        await fs.unlink(`assets/audios/${filename}`);
        console.log(deleted);
        res.status(200).json({"message":"deletion successful"})

    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"Internal server error"})
    }
})


router.get("/viewByToken", isAuthenticated , async (req, res) => {
    try {
        let findEmail = await User.findOne({ _id: req.payload.id });
        if (!findEmail) {
            return res.status(400).json({ message: "Unauthorized" });
        }
        let userID= findEmail._id;
       let x = await Audio.find({producedBy:userID})
       console.log(x) 
      res.status(200).json(x)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/viewById/:userId",isAuthenticated,async (req,res)=>{
    try {
        console.log(req.params.userId);
        let findUser = await User.findOne({_id:req.params.userId});
        if(!findUser){
            res.status(404).json({"message":"User not found"});
        }
        else{
            let result = await Audio.find({producedBy:req.params.userId});
            res.status(200).json(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"Internal server error"});
    }
})


router.get("/viewByAudioId/:audioId",isAuthenticated,async (req,res)=>{
    try {
        console.log(req.params.userId);
        let findAudio = await Audio.findOne({_id:req.params.audioId});
        if(!findAudio){
            res.status(404).json({"message":"Audio not found"});
        }
        else{
           
            res.status(200).json(findAudio);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"Internal server error"});
    }
})

router.get("/viewAll",isAuthenticated,async (req,res)=>{
    try {
        console.log(req.payload);
        let x = await Audio.find()
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Interval server error"});
    }

})  

router.post("/like/:audioId",isAuthenticated,async (req,res)=>{
    try {
        console.log(req.params.audioId);
        let foundAudio = await Audio.findOne({_id:req.params.audioId});
        if(!foundAudio){
            res.status(404).json({"message":"Audio not found."});
        }
        else{
            let updated = await Audio.updateOne({_id:req.params.audioId},{$inc:{likes:1}});
            console.log(updated);
            let u = await Audio.findOne({_id:req.params.audioId})
            res.status(200).json({message:" Like updated successfully.",u})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
})

router.post("/dislike/:audioId",isAuthenticated,async (req,res)=>{
    try {
        console.log(req.params.audioId);
        let foundAudio = await Audio.findOne({_id:req.params.audioId});
        if(!foundAudio){
            res.status(404).json({"message":"Audio not found."});
        }
        else if(foundAudio.likes<=0){
            res.status(200).json({message:"zero likes.. cannot decrement more."})
        }
        else{
            let updated = await Audio.updateOne({_id:req.params.audioId},{$inc:{likes:-1}});
            console.log(updated);
            let u = await Audio.findOne({_id:req.params.audioId})
            res.status(200).json({message:" Like updated successfully.",u})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
})



export default router;
