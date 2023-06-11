const express = require("express");
const router = express.Router();
const { createNote, getNotes, getNote } = require("../controllers/notes");
const auth = require("../../middleware/auth");

router.get("/notes", getNotes);
router.get("/notes/:id", getNote);
router.post("/notes", auth, createNote);

module.exports = router;
