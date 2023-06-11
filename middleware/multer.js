// multer setup

const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./media",
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
