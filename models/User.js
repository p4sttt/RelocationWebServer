const { Schema, model } = require("mongoose");

const User = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  settings: { 
    temperature: {type: Number, required: false},
    tags: {type: Array, required: false},
    job: {type: String, required: false},
    countries: {type: Array, required: false}
  },
});

module.exports = model("User", User);
