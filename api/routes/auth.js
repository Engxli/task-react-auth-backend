const express = require("express");
const router = express.Router();
const { login, register, myProfile, getUsers } = require("../controllers/auth");
const upload = require("../../middleware/multer");
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);
router.post("/register", upload.single("image"), register);
router.get("/me", auth, myProfile);
router.get("/users", getUsers);

module.exports = router;
