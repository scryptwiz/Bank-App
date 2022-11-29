const jwt = require("jsonwebtoken");

export const verifyToken = (req,res,next) => {
    try {
        let token = req.headers('xx-token');

        if (!token) {
            return res.status(401).json({ success: false, message:"No token in the request" })
        }

        const { uid } = jwt.verify(token, process.env.APP_KEY_JWT)
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(500).json({ success:false, message:e.message })
    }
}