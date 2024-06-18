// import dotenv from "dotenv"

// dotenv.config({
//     path: "./env"
// })

// import app from "./app.js";
// import connectDB from "./db/index.js";
// connectDB().then(()=>{
//     app.listen(process.env.PORT || 5000,()=>{
//         console.log(`app is listing on port ${process.env.PORT}`);
//     })
// }).catch((err)=>{
//     console.log("Mongoose connection error",err);
// })

import dotenv from "dotenv";
import connectDB from "../db/index.js";
import app from "../app.js";

dotenv.config({
  path: "./env"
});

const handler = async (req, res) => {
  try {
    await connectDB();
    app(req, res); // Pass the request to the Express app
  } catch (error) {
    console.error("Mongoose connection error", error);
    res.status(500).send("Internal Server Error");
  }
};

export default handler;
