const express = require('express');
const { generateShortUrlHash } = require('../service/generateUrl');
const { Url } = require('../models/url');
const { User } = require('../models/users');

const router = express.Router();

router.get("/urls", async (req, res) => {

    let userEmail = req.userData?.email;
    console.log(userEmail);

    try{
        let user = await User.findOne({email: userEmail}).populate("urls");
        console.log(user);
        res.json(user.urls);
    }catch(err){
        res.status(400).json({message: "Error fetching data"});
    }
});

router.post("/generateurl", async (req, res) => {
    let originalUrl = req.body.originalurl;

    if (!originalUrl) {
        res.status(400).json({ message: "Error generating url" });

    }
    let shortUrl = generateShortUrlHash();
    try {
        const newUrl = await Url.create({
            originalurl: originalUrl,
            shorturl: shortUrl
        });

        const user = await User.findOne({email: req.userData?.email});
        user.urls.push(newUrl._id);
        await user.save();
        res.status(201).json({ message: "Url Generated", originalurl: originalUrl, shorturl: shortUrl });
    } catch (err) {
        res.status(400).json({ message: "Url creation failed"});

    }
});



module.exports = router;

