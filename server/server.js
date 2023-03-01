import express from "express";
import config from "config";
import dbConnect from "./dbConnect.js";

import UserRouter from "./controllers/users/index.js";
import AudioRouter from "./controllers/audio/index.js";


const port = config.get("PORT");
const app = express();

app.use(express.json());
app.use("/api/audio/assets", express.static("assets"));
app.use("/api/user",UserRouter);
app.use("/api/audio",AudioRouter);

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})

app.use("/api/audio/", express.static("assets"));
