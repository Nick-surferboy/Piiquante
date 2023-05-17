const express = require("express");
const sauceCtrl = require ("../controllers/sauce")
const auth = require("../middleware/auth")
const router = express.Router();

router.get("", auth, sauceCtrl.getAllSauce);

module.exports = router;