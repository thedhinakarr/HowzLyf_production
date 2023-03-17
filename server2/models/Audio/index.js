import mongoose from "mongoose";

let audioSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  producedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments:{
    type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    default:[]
  }
}, { timestamps: true })

let Audio = mongoose.model("Audio", audioSchema);

export default Audio;