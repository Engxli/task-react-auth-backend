const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 255,
    },
    password: { type: String, required: true, minlength: 6, maxlength: 1024 },
  })
);

exports.User = User;
