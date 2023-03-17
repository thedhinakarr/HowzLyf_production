import express from "express";
import config from "config";
import dbConnect from "./dbConnect.js";

import UserRouter from "./controllers/user/index.js";
import AudioRouter from "./controllers/audio/index.js";
import CommentRouter from "./controllers/comment/index.js"

import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));



const port = config.get("PORT");
const app = express();




app.use(express.json());
app.use("/api/user/pic",express.static("./assets/profilePictures"));
app.use("/api/user/bio",express.static("./assets/bios"));
app.use("/api/audio/assets", express.static("./assets/audios"));
app.use("/api/comment/comments", express.static("./assets/comments"));

app.use("/api/user",UserRouter);
app.use("/api/audio",AudioRouter);
app.use("/api/comment",CommentRouter);



app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port,()=>{
    console.log(`Listening at ${port}`);
})