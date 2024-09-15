const jwt = require("jsonwebtoken");
const JWT_SECRET = "s3cret@123";

function auth(req, res, next) {
    // const token = req.headers.token;
    const token = req.headers.authorization;

    try {
        if(!token)
            return res.json({ message: "Token not provided" });
    
        const decodedData = jwt.verify(token, JWT_SECRET);
    
        if(decodedData) {
            req.userId = decodedData.id;
            next();
        } else {
            res.status(403).json({
                message: "Incorrect credentials",
            });
        }
    } catch(error) {
        console.log(error);
        res.json({ message: "Internal Server error"});
    }
}

module.exports = {
    auth, 
    JWT_SECRET,
};