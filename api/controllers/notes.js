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
};

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({}).populate("user", "-password");
    return res.status(200).send(notes);
  } catch (error) {
    next(error);
  }
};

const getNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id).populate(
      "user",
      "-password"
    );
    // get absolute path of the image

    note.user.image = `${req.protocol}://${req.get("host")}/${note.user.image}`;

    return res.status(200).send(note);
  } catch (error) {
    next(error);
  }
};

module.exports = { createNote, getNotes, getNote };
