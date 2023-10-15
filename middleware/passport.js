const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const config = require("../config/keys");
const Temp = require("../models/user");

exports.localStrategy = new LocalStrategy(
  {
    usernameField: "email",
  },
  async (email, password, done) => {
    try {
      console.log("here");
      const user = await Temp.findOne({ email: email });
      if (!user) {
        return done(null, false);
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      console.log("HELLO");
      return done(error);
    }
  }
);

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp * 1000) {
      return done(null, false);
    }
    try {
      const user = await Temp.findById(jwtPayload._id);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
