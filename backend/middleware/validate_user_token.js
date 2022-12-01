const jwt = require("jsonwebtoken");
require('dotenv').config()

const verifyToken = (req,res,next) => {
    try {
        let token = req.headers['xx-token'];

        if (!token) {
            return res.status(401).json({ success: false, message:"No token in the request" })
        }
        
        const { id } = jwt.verify(token, process.env.APP_KEY_JWT)
        req.uid = id;
        next();
    } catch (error) {
        return res.status(500).json({ success:false, message:error.message })
    }
}

module.exports = {verifyToken};