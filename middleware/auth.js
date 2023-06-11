const jwt = require("jsonwebtoken");
const User = require("../models/user");
async function auth(req, res, next) {
  // get the token from barear token
  const token = req.header("Authorization").split(" ")[1];
  if (!token) return res.status(401).send("Access denied. No token provided.");
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
  if (decoded.exp < Math.floor(Date.now() / 1000))
    return res.status(401).send("Access denied. Token expired.");

  try {
    req.user = await User.findOne({ _id: decoded._id }).select("-password");
  } catch (error) {
    next(error);
  }

  next();
}

module.exports = auth;
