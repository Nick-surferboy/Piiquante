const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(req, res, next) {
  try {
    hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    await user.save();
    res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function logUserIn(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: new Error("User not found") });
    }
    isPwdValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPwdValid) {
      return res.status(401).json({ error: new Error("Incorrect Password") });
    }
    token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, { expiresIn: "24h" });
    res.status(200).json({ userId: user._id, token: token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = { createUser, logUserIn };
