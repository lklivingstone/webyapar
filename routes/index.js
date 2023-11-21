const router = require('express').Router()
const { ensureAuth, ensureGuest } = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.render('login')
  })

router.get("/success", (req,res)=>{
    res.render('home',{userinfo:"LK"})
})
module.exports=router;