const express = require("express");
const sauceCtrl = require ("../controllers/sauce")
const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")
const router = express.Router();

router.get("", auth, sauceCtrl.getAllSauce);
router.post("", auth, multer, sauceCtrl.createSauce);

module.exports = router;