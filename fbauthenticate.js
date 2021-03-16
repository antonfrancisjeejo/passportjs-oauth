var passport = require('passport');
var FacebookStrategy = require("passport-facebook").Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

passport.use(new FacebookStrategy({
    clientID: '286017899573638',
    clientSecret: '9ef005781325813568614c43e28fd1f8',
    callbackURL: "http://localhost:3000/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // Register user here.
    console.log(profile);
    cb(null, profile);
  }
));