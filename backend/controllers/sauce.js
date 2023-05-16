const { Sauce } = require("../models/models");

function getAllSauce(req, res, next) {
  const sauces = [];
  res.status(200).json({ message: "All good !" });
  return sauces;
}

module.exports = { getAllSauce };
