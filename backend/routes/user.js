const express = require("express");
const userCtrl = require ("../controllers/user")

const router = express.Router();
const rateLimit = require('express-rate-limit');

// Each IP can only send 5 login requests in 10 minutes
const loginRateLimiter = rateLimit({ max: 5, windowMS: 1000 * 60 * 10 })

//create a new user
router.post("/signup", userCtrl.createUser);
//Log the user in 
router.post("/login", /*loginRateLimiter,*/ userCtrl.logUserIn);

module.exports = router;
