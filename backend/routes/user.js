const express = require("express");
const userCtrl = require ("../controllers/user")
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Each IP can only send X login requests in XXXXXX minutes - brute force prevention
const loginRateLimiter = rateLimit({ max: process.env.SINGLE_IP_ATTEMPTS_NUMBER, windowMS: process.env.SINGLE_IP_ATTEMPTS_NUMBER })

//create a new user
router.post("/signup", userCtrl.createUser);
//Log the user in 
router.post("/login", loginRateLimiter, userCtrl.logUserIn);

module.exports = router;
