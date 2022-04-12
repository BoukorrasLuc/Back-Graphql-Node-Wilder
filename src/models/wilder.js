const mongoose = require("mongoose");
const { Schema } = mongoose;

const wilderSchema = new Schema({
  name: { type: String, unique: true },
  city: String,
  skills: [{ title: String, votes: Number }],
});

const Wilder = mongoose.model("wilder", wilderSchema);

module.exports = Wilder;
