const express = require("express");
const router = express.Router();
const { login, register, myProfile, getUsers } = require("../controllers/auth");
const auth = require("../../middleware/auth");
const upload = require("../../middleware/multer");

router.post("/login", login);
router.post("/register", upload.single("image"), register);
router.get("/me", auth, myProfile);
router.get("/users", getUsers);

module.exports = router;
