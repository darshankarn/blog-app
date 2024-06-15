import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        desc:{
            type:String,
            required:true,
        },
        photo:{
            type:String,
        },
        username:{
            type: String,
            required:true
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        categories:{
            type:Array
        }
    }
    ,
    {timestamps:true}
);

export const Post = mongoose.model("Post",postSchema);
