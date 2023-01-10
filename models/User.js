const { Schema, model } = require("mongoose");

const User = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  img: { type: String, required: false },
  settings: {
    temperature: Number || null,
    tags: Array || null,
    countries: Array || null,
    job: { type: String, required: false },
  },
});

module.exports = model("User", User);
