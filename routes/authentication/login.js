const express = require('express');
const { handleLogIn } = require("../../controllers/auth.controller");
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');

router.post("/",asyncHandler(handleLogIn));

module.exports = router;

