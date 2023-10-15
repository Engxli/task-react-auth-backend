const User = require("../../models/user");

const generateToken = require("../../auth/generateToken");
const passhash = require("../../auth/passhash");

const login = async (req, res, next) => {
  try {
    console.log("LOGIN");
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};

const register = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.file.path.replace("\\", "/")}`;
    }
    if (!req.body.image)
      return next({ status: 400, message: "no image was uploaded!" });
    console.log(req.body);
    const { password } = req.body;
    req.body.password = await passhash(password);
    console.log("I AM HERE");
    const newUser = await User.create(req.body);
    console.log("I AM HERE2");

    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    return next({ status: 400, message: error.message });
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
