const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header is required" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }

    try {
        
        const decoded = jwt.verify(token, "secret_key"); 
        req.user = decoded._id;
        next();
    } catch (error) {
        
        console.error('Token verification error:', error); 
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = auth;
