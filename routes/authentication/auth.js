const express = require('express');

const signUpRouter = require('./signup');
const logInRouter = require('./login');


module.exports = {
    signUpRouter,
    logInRouter,
}