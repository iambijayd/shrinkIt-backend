const {verifyToken} = require("../service/auth");
const ApiError = require("../utils/ApiError");

function validateInputData(req,res,next){
    let userData = req.body;
    if(!userData.email || !userData.password){
        throw new ApiError(400, "Invalid Input Data");
    }
    let emailRegEx = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$','g');
    let isValidEmail = emailRegEx.test(userData.email);
    if(!isValidEmail){
        throw new ApiError(400, "Invalid Input Data");
    }
    next();
}


function validateToken(req,res,next){
    const token = (req.cookies?.__auth_token);
    console.log("Token from validate Token: ");
    console.log(token);
    if(!token){
        throw new ApiError(400, "Token not found please logIn");
    }
    try{
        let decodedData = verifyToken(token);
        req.userData = decodedData;
        next();
    }catch(err){
        throw new ApiError(400,"Error validating token");
    }
}

module.exports = {
    validateInputData,
    validateToken,
}