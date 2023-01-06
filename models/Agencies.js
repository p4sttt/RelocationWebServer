const {Schema, model} = require("mongoose")

const Agencies = new Schema({
  name: {type: String, required: true, unique: true},
  description: {type: String, require: false, unique: false},
  countries: [String]
})

module.exports = model("Agencies", Agencies);