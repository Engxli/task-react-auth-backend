const jwt = require("jsonwebtoken");
function auth(req, res, next) {
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
  req.user = decoded;
  next();
}

module.exports = auth;
