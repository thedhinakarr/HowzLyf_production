import mongoose from "mongoose";

let commentSchema = new mongoose.Schema({
    filename: {
      type: String,
      required: true,
    },
    commentUrl: {
      type: String,
      required: true,
    },
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentedOn:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"audio",
    }
}, { timestamps: true })

let Comment = mongoose.model("Comment", commentSchema);

export default Comment;