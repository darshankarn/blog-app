import jwt from "jsonwebtoken"

const verifyJwt = (req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    jwt.verify(token,process.env.SECRET,async(err,data)=>{
        if(err){
            return res.status(401).json({message:"Invalid token"})
        }
        req.userId = data.id
        next()
    })
}

export default verifyJwt