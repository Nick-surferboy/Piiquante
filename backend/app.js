const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

const app = express();

async function connectDB() {
  try {
    await mongoose.connect(process.env.URI, { dbName: process.env.DBNAME });
    console.log("Successfully connected to mongoDB Atals database");
  } catch (error) {
    console.log("Unable to connect to the database");
    console.error(error);
  }
}

try {
  connectDB();
} catch (error) {
  console.log(error);
}

//body parser
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

app.all("*", (req, res) => {
  return res.status(404).json({ error: "Route not found" });
});

module.exports = app;
