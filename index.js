const express = require('express');
const mongoose=require('mongoose');
const dotenv = require('dotenv').config();
const passport = require('passport');
// const session = require('express-session');
const cookie = require('cookie-session');


// Mongo & Template Setup
var app = express();
const PORT = process.env.PORT || 3000;


app.use(cookie({
    name: 'keyboardcat',
    keys: ['k1', 'k2']
}))


require('./passport/passport')

app.use(passport.session())
app.use(passport.initialize())
app.set('view engine','ejs');

app.get("/", (req, res) => {
    req.session = null;
    res.render("login")
})

app.get("/success", (req,res)=>{
    console.log(req.user.displayName)
    res.render('home',{userinfo: req.user.displayName})
})

app.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))


app.get(
    '/google/callback',
  passport.authenticate('google', { 
		// successRedirect: '/api/auth/google/success',
        failureRedirect: '/failure'
	 }),
  (req, res) => {
    res.redirect('/success')
  }
)

app.get('/logout', (req, res) => {
    req.session = null;
  req.logout()
  res.redirect('/')
})


// app.use(require("./routes/index"))
// app.use(require('./routes/auth'))

app.listen(PORT,console.log(`listening at ${PORT}`))