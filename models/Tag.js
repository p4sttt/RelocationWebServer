const {Schema, model} = require("mongoose")

const Tag = new Schema({
  tag: {type: String, require: true, unique: true}
})

module.exports = model('Tags', Tag)