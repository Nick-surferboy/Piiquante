const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator') ;
const mongodbErrorHandler = require('mongoose-mongodb-errors')

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
      email: {type: String, required: true, unique: true},
      password: {type: String, required: true},
});
userSchema.plugin(uniqueValidator); 
mongoose.plugin(mongodbErrorHandler);

Sauce = mongoose.model('Sauce', sauceSchema) ; 
User = mongoose.model('User', userSchema) ; 

module.exports = { Sauce, User };
