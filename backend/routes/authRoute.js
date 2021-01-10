var express = require('express')
var router = express.Router()
const authController = require('../controller/authController')
const verifyTokenmiddleware = require('../middleware/verifyToken') 
require('dotenv').config()



router.post('/register', authController.register )
router.post('/login', authController.logIn)

router.post('/reset', authController.Reset)
router.post('/reset-password-done', authController.resestPasswordDone)
router.post('/change-password', verifyTokenmiddleware.verifyToken,authController.changePassword)

// hello
router.get('/check', verifyTokenmiddleware.verifyToken, authController.getCheck)
module.exports = router