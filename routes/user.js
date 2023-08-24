const express = require('express');

const router = express.Router();

router.get("/urls",(req,res)=>{
    //get the urls from the backend
    res.json({message: "Your URL...."});
});

router.post("/generateurl",(req,res)=>{
    //generate a short url and save it in the backend
    
    res.status(201).json({message: "Url Generated"});
})


module.exports = router;

