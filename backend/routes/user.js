const express = require("express");
const userCtrl = require ("../controllers/user")
const auth = require("../middleware/auth")
const router = express.Router();


//create a new user
router.post("/signup", userCtrl.createUser);
//Log the user in 
router.post("/login", userCtrl.logUserIn);

module.exports = router;
