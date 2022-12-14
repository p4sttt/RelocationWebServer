require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./auth/authRouter");
const userRouter = require("./user/userRouter");
const countriesRouter = require("./countries/countriesRouter");
const dashboardRouter = require("./dashboard/dashboardRouter");

app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("", authRouter);
app.use("", userRouter);
app.use("", countriesRouter);
app.use("", dashboardRouter);

function start() {
  try {
    app.listen(process.env.PORT, () => {
      mongoose.set("strictQuery", false);
      mongoose.connect(process.env.DB_URI, () => {
        console.log("DB ok");
      });
      console.log("Server ok");
    });
  } catch (error) {
    console.log(error);
  }
}

start();
