const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const timeForExpire = 60 * 3; // 3 minutes

const login = async (req, res, next) => {
  // Check if user already in db
  let user = await User.findOne({ email: req.body.email });
  // If user not in db return 400
  if (!user) return res.status(400).send("Invalid email or password!");
  // Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  // If password is not correct return 400
  if (!validPassword) return res.status(400).send("Invalid email or password!");
  // Return user
  const token = jwt.sign(
    { _id: user._id, exp: Math.floor(Date.now() / 1000) + timeForExpire },
    process.env.JWT_SECRET
  );

  res.status(200).send({
    token,
  });
};

const register = async (req, res, next) => {
  // Check if user already registered
  let user = await User.findOne({ email: req.body.email });
  // If user already registered return 400
  if (user) return res.status(400).send("user already registered!");
  // Create new user
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  // Hash password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  // Save user
  try {
    await user.save();
  } catch (error) {
    res.status(400).send(error.message);
  }

  // Return user
  const token = jwt.sign(
    { _id: user._id, exp: Math.floor(Date.now() / 1000) + timeForExpire },
    process.env.JWT_SECRET
  );
  res.status(201).send({
    token,
  });
};

const myProfile = async (req, res, next) => {
  // Get user
  const user = await User.findById(req.user._id).select("-password");
  // If user not found return 404
  if (!user) return res.status(404).send("User not found!");
  // Return user
  res.status(200).send(user);
};

module.exports = { login, register, myProfile };
