var passport = require('passport');
var GithubStrategy = require("passport-github2").Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

passport.use(new GithubStrategy({
    clientID: "7821c275157da1e8e687",
    clientSecret: "c687e03611c89431b5692a342ca3dfe4c85cb2ee",
    callbackURL: "http://localhost:3000/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // Register user here.
    console.log(profile);
    cb(null, profile);
  }
));