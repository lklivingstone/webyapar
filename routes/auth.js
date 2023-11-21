const express = require('express')
const passport = require('passport')
const router = express.Router()


router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))


router.get(
    '/google/callback',
  passport.authenticate('google', { 
		// successRedirect: '/api/auth/google/success',
        failureRedirect: '/failure'
	 }),
  (req, res) => {
    res.redirect('/success')
  }
)

router.get('/logout', (req, res) => {
    req.session = null;
  req.logout()
  res.redirect('/')
})

module.exports = router;