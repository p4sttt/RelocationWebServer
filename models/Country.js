const { Schema, model } = require("mongoose");

const Country = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  agencies: [{
    name: {type: String, required: true, unique: true},
    description: {type: String, required: false},
    logo: {type: String, required: false}
  }],
  temperatures: [Number],
  tags: [String],
});

module.exports = model("Country", Country);
