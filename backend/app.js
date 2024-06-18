import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    maxAge: 1800,
    allowedHeaders: ['content-type'],
    methods: ['PUT', 'POST','GET', 'DELETE', 'PATCH', 'OPTIONS']
};

app.use(cors(corsOptions));



app.use(express.json({
    limit: "16kb"
}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))
app.use(cookieParser())


import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import commentRouter from "./routes/comment.js";
app.use('/api/v1/user',userRouter);
app.use('/api/v1/post',postRouter);
app.use('/api/v1/comment',commentRouter);


export default app