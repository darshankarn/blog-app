import dotenv from "dotenv"

dotenv.config({
    path: "./env"
})

import app from "./app.js";
import connectDB from "./db/index.js";
connectDB().then(()=>{
    app.listen(process.env.PORT || 5000,()=>{
        console.log(`app is listing on port ${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log("Mongoose connection error",err);
})