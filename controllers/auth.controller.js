const {User} = require("../models/users");
const {generateToken} = require("../service/auth");

let userInfoMap = new Map();


async function handleSignUp(req, res) {
    let userData = req.body;
    try {
        await User.create({
            email: userData.email,
            password: userData.password,
            urls: []
        });
        let userToken = generateToken(userData);
        userInfoMap.set(userData.email,userData);
        res.cookie("__auth_token",userToken,{maxAge: 3600000,httpOnly: true});
        return res.status(201).json({success: "SignUp Successful"});
    }catch(err){
        if(err.code == 11000){
            return res.status(409).json({error: "Email already exists"});
        }
    }
}

async function handleLogIn(req, res) {
    let {email, password} = req.body;
    let user = await User.find({email: `${email}`, password: `${password}`});
    if(!user.length){
        res.status(404).json({error: "Email or password didnot match"});
    }else{
        let userToken = generateToken(req.body);
        res.cookie("__auth_token",userToken,{maxAge: 3600000,httpOnly: true});
        res.status(200).json({message: "LoggedIn Successfully"});
    }
}

module.exports = {
    handleSignUp,
    handleLogIn
}