const express = require("express");
const router = express.Router();
const { createNote, getNotes } = require("../controllers/notes");
const auth = require("../../middleware/auth");

router.get("/notes", getNotes);
router.post("/notes", auth, createNote);

module.exports = router;
