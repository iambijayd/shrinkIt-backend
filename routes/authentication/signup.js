const express = require('express');
const { handleSignUp } = require("../../controllers/auth.controller");

const router = express.Router();

router.post("/",handleSignUp);


module.exports = router;