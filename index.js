const express = require("express");
const mongoose = require("mongoose");
const dontenv = require("dotenv");
const app = express();
// Routes
const auth = require("./api/routes/auth");
const note = require("./api/routes/notes");

// Config
dontenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// This is the routes everything starts from api
app.use("/api/auth", auth);
app.use("/api", note);

// path not found 404
app.use((req, res, next) => {
  res.status(404).json({
    msg: "Path not found",
    success: false,
  });
});
// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    msg: err.message,
    success: false,
  });
});

mongoose
  .connect(process.env.DB)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${process.env.PORT || 5000}`);
});

// app.listen(process.PORT || 5000, () => {
//   console.log(`Listening on port ${process.PORT || 5000}`);
// });
