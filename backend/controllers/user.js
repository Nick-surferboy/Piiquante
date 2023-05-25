const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Redis = require("ioredis");

const redis = new Redis();

async function createUser(req, res, next) {
  try {
    let email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: password,
    });
    await User.create({email, password});
    //await user.save();
    res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
 
async function logUserIn(req, res, next) {
  try {
    //User email adress check
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: new Error("Email or password is incorrect") });
    }
    //User attemnpts check -- Brute Force prevention
    let userAttempts = await redis.get(user.email); 
    if (userAttempts >= process.env.SAME_USER_ATTEMPTS_NUMBER) {
      return res.status(429).send("Too Many Attempts try it later");
    }
    //Password check
    const isPwdValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPwdValid) {
      await redis.set(user.email, ++userAttempts, "ex", process.env.SAME_USER_ATTEMPTS_DURATION);
      return res.status(401).json({ error: new Error("Email or password is incorrect") });
    }

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    await redis.del(user.email);
    res.status(200).json({ userId: user._id, token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createUser, logUserIn };
