const express = require("express");
const sauceCtrl = require ("../controllers/sauce")
const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")
const router = express.Router();

router.get("/", auth, sauceCtrl.getAllSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.post("/:id/like", auth, multer, sauceCtrl.like);
router.put("/:id", auth, multer,sauceCtrl.updateOneSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);

module.exports = router;