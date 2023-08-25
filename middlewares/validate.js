const {verifyToken} = require("../service/auth");

function validateInputData(req,res,next){
    let userData = req.body;
    if(!userData.email || !userData.password){
        return res.status(400).json({error: "Invalid Input Data"});
    }
    let emailRegEx = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$','g');
    let isValidEmail = emailRegEx.test(userData.email);
    if(!isValidEmail){
        return res.status(400).json({error: "Invalid Input Data"});
    }
    next();
}


function validateToken(req,res,next){
    const token = (req.cookies?.__auth_token);
    console.log(token);
    try{
        let decodedData = verifyToken(token);
        req.userData = decodedData;
        next();
    }catch(err){
        console.log(err);
        res.json({error: "Error validating token"});
    }
}

module.exports = {
    validateInputData,
    validateToken,
}