// import all the things we need  
const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
// const mongoose = require('mongoose')
// const User = require('../models/User')


  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URI,
		passReqToCallback: true
      },
      (req, accessToken, refreshToken, profile, done) => {

        return done(null, profile)
        
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user);
  })

  // used to deserialize the user
  passport.deserializeUser((user, done) => {
    done(null, user);
  })
