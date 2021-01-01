var express = require('express')
var router = express.Router()
const authController = require('../controller/authController')
require('dotenv').config()



router.post('/register', authController.register )
router.post('/login', authController.logIn)

router.post('/reset', authController.Reset)
router.post('/reset-password-done', authController.resestPasswordDone)


router.get('/check', authController.verifyToken, authController.getCheck)
module.exports = router