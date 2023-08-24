const express = require('express');
const { handleLogIn } = require("../../controllers/auth.controller");
const router = express.Router();

router.post("/",handleLogIn);

module.exports = router;

