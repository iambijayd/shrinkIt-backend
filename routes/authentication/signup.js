const express = require('express');
const { handleSignUp } = require("../../controllers/auth.controller");
const asyncHandler = require('../../utils/asyncHandler');

const router = express.Router();

router.post("/",asyncHandler(handleSignUp));


module.exports = router;