const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
});
const Note = mongoose.model(
  "Note",
  new mongoose.Schema({
    topic: { type: [topicSchema], required: true },
    title: { type: String, required: true, minlength: 3, maxlength: 50 },
    body: { type: String, required: true, minlength: 3 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  })
);
// validate that topic is not empty array

module.exports = Note;
