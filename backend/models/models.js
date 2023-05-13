const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Need a heat score !"],
  },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: [String],
  usersDisliked: [String],
});
const userSchema = mongoose.Schema({
      email: {type: String},
      password: {type: String},
});

Sauce = mongoose.model('Sauce', sauceSchema) ; 
User = mongoose.model('Sauce', userSchema) ; 

module.exports = { Sauce, User };
