const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const token = req.header('Authorization').split(" ")[1];
    if(!token) return res.status(401).json({error:"Token is required"})
    try{
        const decoded = jwt.verify(token,"secret_key");
        req.user = decoded._id;
        next();
        console.log(req.user)
    }
    catch(error){
         res.status(200).send({msg:"Invalid token"})
    }
}
module.exports = auth;