const { Sauce } = require("../models/models");
const fs = require("fs");

async function getAllSauce(req, res, next) {
  try {
    const sauces = await Sauce.find();
    res.status(200).json(sauces);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function createSauce(req, res, next) {
  try {
    req.body.sauce = JSON.parse(req.body.sauce);
    console.log(req.file)
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
    res.status(400).json({ error: error.message });
  }
}

async function getOneSauce(req, res, next) {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });
    res.status(200).json(sauce);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function like(req, res, next) {
  try {
    const userId = req.body.userId;
    const sauce = await Sauce.findOne({ _id: req.params.id });

    let likes = sauce.likes;
    let dislikes = sauce.dislikes;
    let usersLiked = sauce.usersLiked;
    let usersDisliked = sauce.usersDisliked;

    switch (req.body.like) {
      case 1:
        usersLiked.push(userId);
        likes++;
        break;
      case 0:
        const index = sauce.usersLiked.findIndex((user) => user === userId);
        if (index === -1) {
          usersDisliked.splice(index, 1);
          dislikes--;
        } else {
          usersLiked.splice(index, 1);
          likes--;
        }
        break;
      case -1:
        usersDisliked.push(userId); 
        dislikes++;
        break;
      default:
        res.status(400).json({ error: error.message });
    }
    sauce.likes = likes ; 
    sauce.dislikes = dislikes;
    sauce.usersLiked = usersLiked;
    sauce.usersDisliked = usersDisliked;
    //update the sauce object
    await Sauce.updateOne({ _id: req.params.id }, sauce);
    res.status(201).json({ message: "Like updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateOneSauce(req, res, next) {
  try {
    let sauce = new Sauce({ _id: req.params.id });
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      req.body.sauce = JSON.parse(req.body.sauce);
      sauce = {
        _id: req.params.id,
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + "/images/" + req.file.filename,
        heat: req.body.sauce.heat,
        likes: req.body.sauce.likes,
        dislikes: req.body.sauce.dislikes,
        usersLiked: req.body.sauce.usersLiked,
        usersDisliked: req.body.sauce.usersDisliked,
      };
    } else {
      sauce = {
        _id: req.params.id,
        userId: req.body.userId,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        heat: req.body.heat,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        usersLiked: req.body.usersLiked,
        usersDisliked: req.body.usersDisliked,
      };
    }
    await Sauce.updateOne({ _id: req.params.id }, sauce);
    res.status(201).json({ message: "Sauce updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteSauce(req, res, next) {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });
    const filename = sauce.imageUrl.split("/images/")[1];
    fs.unlink("images/" + filename, async () => {
      await Sauce.deleteOne({ _id: req.params.id });
    });
    res.status(200).json({ message: "Deleted!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { getAllSauce, createSauce, getOneSauce, like, updateOneSauce, deleteSauce };
