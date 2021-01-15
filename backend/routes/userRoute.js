var express = require('express')
var router = express.Router()
const useController = require('../controller/userController')
const verifyTokenmiddleware = require('../middleware/verifyToken') 
require('dotenv').config()


router.get('/myprofile',verifyTokenmiddleware.verifyToken,useController.myProfile)
router.post('/editprofile', verifyTokenmiddleware.verifyToken,useController.editProfile)

module.exports = router