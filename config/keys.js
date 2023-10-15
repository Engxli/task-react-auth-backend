require("dotenv").config();

const config = {
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_TOKEN_EXP: "10h",
  DB: process.env.DB,
};

if (!config.JWT_TOKEN_EXP) {
  console.log("missing env values!");
  process.exit(1);
}
module.exports = config;
