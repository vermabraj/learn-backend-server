const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
  title: String,
  body: String,
  user: String,
});

const notesModel = mongoose.model("note", notesSchema);

module.exports = { notesModel };
