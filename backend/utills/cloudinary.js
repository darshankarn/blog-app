import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloud = async(localPath)=>{
    try {
        const res = await cloudinary.uploader.upload(localPath,{
            resource_type: 'auto'
        });
        console.log("Uploaded")
        fs.unlinkSync(localPath)
        return res;
    } catch (error) {
        fs.unlinkSync(localPath)
        console.log(error,"Clodinary upload error")
        return null
    }
}

export default uploadOnCloud