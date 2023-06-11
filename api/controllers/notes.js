const Note = require("../../models/note");
const User = require("../../models/user");

const createNote = async (req, res, next) => {
  console.log(req.body);
  try {
    const note = await Note.create({
      topic: req.body.topic,
      title: req.body.title,
      body: req.body.body,
      user: req.user._id,
    });
    return res.status(201).send(note);
  } catch (error) {
    return res.status(400).send(error.message);
  }
  // Return note
};

module.exports = { createNote };
