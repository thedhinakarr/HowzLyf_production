import dbConnect from "./dbConnect.js";

import express from "express";

import multer from "multer";

import AudioModel from "./audio.model.js";
let port =6003;
let app = express();

//Storage:

const Storage = multer.diskStorage({
    destination:`uploads`,
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    },
})

const upload = multer({
    storage:Storage
}).single('testing')

app.use(express.json());

app.post("/upload",async (req,res)=>{
    upload(req,res,async (err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newAudio = new AudioModel({
                name: req.body.name,
                audio:{
                    data: req.file.filename,
                    contentType: 'audio/wav'
                }
            })

           await  newAudio.save();

           res.json({message:"Upload Successful"})

        }
    })
    // res.status(200).json({message:"Hit successfully."})
})

app.get("/getAudio",async (req,res)=>{
    let name = req.body.name;
    let x = await AudioModel.find({"name":name})
    console.log(x);

    res.set('Content-Type', audio.type);
    
    res.status(200).send(x)
})


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
});


