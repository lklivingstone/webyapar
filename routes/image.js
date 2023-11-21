const router= require("express").Router()
const User = require("../models/User")
const Image = require("../models/Image")
require("dotenv/config")
const fs= require("fs")
const path= require("path")


router.get("/find/:userId", async (req, res) => {
    try {
        const foundImages= await Image.find({userID: req.params.userId})
        res.status(200).json(foundImages)
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports= router