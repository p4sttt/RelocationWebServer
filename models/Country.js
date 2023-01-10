const { Schema, model } = require("mongoose");

const Country = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  temperatures: [Number],
  tags: [String],
});

module.exports = model("Country", Country);
