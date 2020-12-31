var express = require('express')
var router = express.Router()
const authController = require('../controller/authController')
require('dotenv').config()



router.post('/register', authController.register )
router.post('/login', authController.logIn)


router.get('/check', authController.verifyToken, authController.getCheck)
module.exports = router