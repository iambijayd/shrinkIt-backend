const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const {validateInputData, validateToken} = require('./middlewares/validate');
const {signUpRouter, logInRouter} = require('./routes/authentication/auth');
const userRouter = require("./routes/user");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/signup",validateInputData,signUpRouter);
app.use("/login",validateInputData,logInRouter);
app.use("/user",validateToken,userRouter);


app.listen(3000,async ()=>{
    console.log("Listening on port: 3000");
   await mongoose.connect(process.env.MONGO_URI,{dbName: "Url-Shortener",});
});

module.exports = app;
