const express = require("express");
const router = express.Router();
const { createNote, getNotes, getNote } = require("../controllers/notes");
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });

router.get("/notes", getNotes);
router.get("/notes/:id", getNote);
router.post("/notes", auth, createNote);

module.exports = router;
