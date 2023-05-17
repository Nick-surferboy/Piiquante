const { Sauce } = require("../models/models");

async function getAllSauce(req, res, next) {
  const sauces = await Sauce.find();
  res.status(200).json(sauces);
}

async function createSauce(req, res, next) {
  try {
    req.body.sauce = JSON.parse(req.body.sauce);
    const url = req.protocol + "://" + req.get("host");
    const sauce = new Sauce({
      userId: req.body.sauce.userId,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      mainPepper: req.body.sauce.mainPepper,
      imageUrl: url + "/images/" + req.file.filename,
      heat: req.body.sauce.heat,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
    });
    await sauce.save();
    res.status(201).json({ message: "Sauce added !" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

module.exports = { getAllSauce, createSauce };
