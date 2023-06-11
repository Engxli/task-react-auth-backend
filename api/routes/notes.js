const express = require("express");
const router = express.Router();
const { createNote } = require("../controllers/notes");
const auth = require("../../middleware/auth");

router.post("/notes", auth, createNote);

module.exports = router;
