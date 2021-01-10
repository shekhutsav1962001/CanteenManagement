var express = require('express')
var router = express.Router()
const adminController = require('../controller/adminController')
const verifyTokenmiddleware = require('../middleware/verifyToken') 
require('dotenv').config()

router.get('/abc', (req, res) => {
    console.log(process.env.ABC)
    console.log(process.env.PQR)
    res.send("hello get abc");
})

router.post('/addfood', verifyTokenmiddleware.verifyToken, adminController.upload.single('file'), adminController.addFood )

module.exports = router