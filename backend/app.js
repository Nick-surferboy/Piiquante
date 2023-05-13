const { error } = require("console");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Successfully connected to mongoDB Atals database");
  } catch (error) {
    console.log("Unable to connect to the database");
    console.error(error);
  }
}

const main = () => {
  connectDB();
  console.log(`Your port is ${process.env.PORT}`);
};

try {
  main();
} catch (error) {
  console.log(error);
}

app.use((req, res, next) => {
  console.log("response successfully");
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: "My first response" });
  // res.status(200).json({message : 'My first response'});
  next();
});

module.exports = app;
