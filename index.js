const express = require('express');
const mongoose=require('mongoose');
const dotenv = require('dotenv').config();
const passport = require('passport');
const cookie = require('cookie-session');
const multer = require('multer');
const path = require('path');

const User = require("./models/User");

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
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    req.session = null;
    res.render("login")
})


app.get("/success", (req,res)=>{
    res.render('home',
    {
        userName: req.user.displayName,
        userID: req.user.id
    }
    )
})

app.get("/gallery", (req,res)=>{
    // console.log(req.user.displayName)
    res.render('gallery',
    {userinfo: req.user.displayName}
    )
})

app.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))


app.get(
    '/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/failure'
    }),
    async (req, res) => {
        try {
            const user = await User.findOne({ googleId: req.user.id })

            if (user) {
                res.redirect('/success');
            }
            else {
                const newUser = new User({
                    googleId: req.user.id,
                    name: req.user.displayName,
                    email: req.user.email,
                  });
        
                await newUser.save();

              res.redirect('/success');

            }
        }
        catch (err) {
            console.error('Error during sign-up:', error);
            res.redirect('/failure');
        }
    }
    
  );



app.get('/logout', (req, res) => {
    req.session = null;
  req.logout()
  res.redirect('/')
})

mongoose.connect(
    process.env.DB_CONNECTION
    ).then(
        () => console.log("Connected to DB")
        ).catch(
            (err)=> {
                console.log(err)
            })

// app.use(require("./routes/index"))
// app.use(require('./routes/auth'))

const uploadRoute= require("./routes/upload")
const imageRoute= require("./routes/image")
app.use("/upload", uploadRoute)
app.use("/image", imageRoute)

app.listen(PORT,console.log(`listening at ${PORT}`))