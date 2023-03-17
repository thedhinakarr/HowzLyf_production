import express from "express";
import multer from "multer";
import User from "../../models/Users/index.js";
import Audio from "../../models/Audio/index.js";
import Comment from "../../models/Comments/index.js";
import { isAuthenticated } from "../../middleware/auth/index.js";

const router = express.Router();

const commentStorage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "./assets/comments/");
    },

    filename: function (req, file, cb) {
        let ext = file.mimetype.split("/")[1];
        cb(null, file.fieldname + "-" + Date.now() + "." + "wav");
    },

});

const uploadComment = multer({ storage: commentStorage });


router.post("/addComment/:audioId", isAuthenticated, uploadComment.single('comment'), async (req, res) => {
    try {
        console.log(req.params.audioId)
        let findEmail = await User.findOne({ _id: req.payload.id });
        let foundAudio = await Audio.findOne({ _id: req.params.audioId });

        if (!findEmail) {
            return res.status(400).json({ message: "Unauthorized" });
        }
        if (!foundAudio) {
            return res.status(404).json({ message: "Audio not found" });
        }

        else {
            let filename = req.file.filename;
            let commentUrl = `/api/comment/comments/${filename}`;
            let id = findEmail._id;


            let comment = new Comment({
                filename,
                commentUrl,
                commentedBy: id,
                commentedOn: foundAudio._id
            })


            await comment.save()

            let x = await Comment.findOne({ filename: filename })
            console.log(x)

            await Audio.updateOne({ _id: foundAudio._id }, { $push: { "comments": x._id } })
            let y = await Comment.findOne({ filename: filename })
            let result = await Audio.findOne({_id:foundAudio._id})
            res.status(200).json({ message: "Comment successfully uploaded.",y,result })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal server error" })
    }
})


router.delete("/deleteComment/:commentId",isAuthenticated,async (req,res)=>{
    try {
      console.log(req.params.commentId);
      
      let foundComment = await Comment.findOne({_id:req.params.commentId});
      if(!foundComment){
        res.status(404).json({"message":"comment not found"});
      }
      else{
        await Audio.updateOne({_id:foundComment.commentedOn},{$pull:{"comments":foundComment._id}})
        await Comment.deleteOne({_id:foundComment._id});

        res.status(200).json({"message":"Comment deletion and updation successfull."});
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({"message":"Internal server error"});
    }
  })


  router.get("/getCommentByAudio/:audioId",isAuthenticated, async (req,res)=>{
    try {
        console.log(req.params.audioId);
        let foundComments = await Comment.find({commentedOn:req.params.audioId})
        if(!foundComments){
            res.status(404).json({"message":"Audio commented on not found."})
        }

        res.status(200).json(foundComments);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"internal server error"});
    }
  })

router.get("/getCommentByUser/:userId",isAuthenticated,async (req,res)=>{
    try {
        console.log(req.params.userId);
        let foundComments = await Comment.find({commentedBy:req.params.userId})
        if(!foundComments){
            res.status(404).json({"message":"Audio commented on not found."})
        }
        res.status(200).json(foundComments);
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"internal server error"});
    }
})

router.get("/getCommentsByToken",isAuthenticated,async (req,res)=>{
    try {
        console.log(req.payload.id)
        let foundComments = await Comment.find({commentedBy:req.payload.id});
        if(!foundComments){
            res.status(404).json({"message":"Comments not found"});
        }

        res.status(200).json(foundComments);
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"Internal server error"});
    }
})

export default router;