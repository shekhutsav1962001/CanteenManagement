var express = require('express')
var router = express.Router()
const useController = require('../controller/userController')
require('dotenv').config()

router.get('/abc', (req, res) => {
    console.log(process.env.ABC)
    console.log(process.env.PQR)
    console.log(process.env.SECRETKEY);
    res.send("hello get abc");
})



module.exports = router