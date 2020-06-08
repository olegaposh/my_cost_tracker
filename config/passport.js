const LocalStrategy = require("passport-local").Strategy;
// const JwtStrategy = require("passport-jwt").Strategy;
// const jwtSecret = require("./jwt-config");
const db = require("../models");

//In order to keep authentication state across HTTP requests
module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const data = await db.user.findOne({ where: { id: id } });

    done(null, data);
  });

// sign up 
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: true
      },
      async (email, password, done) => {
        let data = await db.user.findOne({ where: { email: email } });
        // if email already exists return error
        if (data) {
          return done(null, false, {
            message: "Oops! Email already signed-up."
          });
          // If email doesn't exist create new user 
        } else {
          data = await db.user.create({
            email: email,
            password: db.user.generateHash(password)
          });

          return done(null, data);
        }
      }
    )
  );
// log in 
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false
      },
      async (email, password, done) => {
        let data = await db.user.findOne({ where: { email: email } });

        if (!data) {
          return done(null, false, { message: "No email found." });
        }
        if (!db.user.validPassword(password, data.password)) {
          return done(null, false, { message: "Oops! Wrong password!" });
        }

        return done(null, data);
      }
    )
  );

  const opts = {
    jwtFromRequest: req => {
      return req.cookies.jwt;
    },
    secretOrKey: jwtSecret.secret
  };

  passport.use(
    "jwt",
    new JwtStrategy(opts, async (jwtpayload, done) => {
      const data = await db.user.findOne({ id: jwtpayload.sub });

      if (data) {
        return done(null, data);
      } else {
        return done(null, false, { message: "No user found." });
      }
    })
  );
};