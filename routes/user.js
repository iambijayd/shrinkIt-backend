const express = require("express");
const { generateShortUrlHash } = require("../service/generateUrl");
const { Url } = require("../models/url");
const { User } = require("../models/users");
const asyncHandler = require("../utils/asyncHandler");

const ApiError = require('../utils/ApiError');

const router = express.Router();

router.get(
  "/urls",
  asyncHandler(async (req, res) => {
    let userEmail = req.userData?.email;
    let user = await User.findOne({ email: userEmail }).populate("urls");
    console.log(user);
    console.log(user.urls);
    res.json(user.urls);
  })
);

router.post(
  "/generateurl",
  asyncHandler(async (req, res) => {
    let originalUrl = req.body.originalurl;
    if (!originalUrl) {
        throw new ApiError(400,"Error generating url");
    }
    let shortUrl = generateShortUrlHash();
    shortUrl = req.protocol + "://" + req.headers.host + "/" + shortUrl;
    const newUrl = await Url.create({
      originalurl: originalUrl,
      shorturl: shortUrl,
    });
    const user = await User.findOne({ email: req.userData?.email });
    user.urls.push(newUrl._id);
    await user.save();
    res.status(201).json({
      message: "Url Generated",
      originalurl: originalUrl,
      shorturl: shortUrl,
    });
  })
);

module.exports = router;
