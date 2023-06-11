const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const timeForExpire = 60 * 60; // 3 minutes

const login = async (req, res, next) => {
  // Check if user already in db
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
  } catch (ex) {
    const error = new Error("Invalid email!");
    error.status = 400;
    next(error);
  }
  if (!user) return res.status(400).send("Invalid email or password!");
  try {
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password!");
  } catch (ex) {
    next(ex);
  }

  const token = jwt.sign(
    { _id: user._id, exp: Math.floor(Date.now() / 1000) + timeForExpire },
    process.env.JWT_SECRET
  );

  res.status(200).send({
    token,
  });
};

const register = async (req, res, next) => {
  try {
    // Check if user already registered
    console.log(req.body);
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("User already registered!");
    }

    let imagePath = "";
    if (req.file) {
      imagePath = req.file.path;
    }

    // Create new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      image: imagePath,
    });

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.password, salt);

    await newUser.save();

    // Return user
    const token = jwt.sign(
      { _id: newUser._id, exp: Math.floor(Date.now() / 1000) + timeForExpire },
      process.env.JWT_SECRET
    );
    res.status(201).send({ token });
  } catch (error) {
    next(error);
  }
};

const myProfile = async (req, res, next) => {
  // Get user
  const user = await User.findById(req.user._id).select("-password");
  // If user not found return 404
  if (!user) return res.status(404).send("User not found!");
  // Return user
  res.status(200).send(user);
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    users.forEach((user) => {
      user.image = `${req.protocol}://${req.get("host")}/${user.image}`;
    });
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

module.exports = { login, register, myProfile, getUsers };
