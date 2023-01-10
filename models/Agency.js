const { Schema, model } = require("mongoose");

const Agencies = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, require: false, unique: false },
  country: { type: String, require: true, unique: true },
  logo: { type: String, require: false },
});

module.exports = model("Agencies", Agencies);
