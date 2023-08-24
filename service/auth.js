const jwt = require('jsonwebtoken');
require('dotenv').config();


function generateToken(userData) {
    const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
    return token;
}

function verifyToken(token) {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return decodedToken;
    }catch(err){
        if(err.name == 'TokenExpiredError'){
            throw new Error("Token is expired");
        }else if(err.name == 'JsonWebTokenError'){
            throw new Error("Invalid Token");
        }else{
            throw new Error("Token verification failed");
        }
    }
}

module.exports = {
    generateToken,
    verifyToken,
}