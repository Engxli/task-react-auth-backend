const express = require("express");
const router = express.Router();
const { login, register, myProfile } = require("../controllers/auth");
const auth = require("../../middleware/auth");

router.post("/login", login);
router.post("/register", register);
router.get("/me", auth, myProfile);

module.exports = router;
