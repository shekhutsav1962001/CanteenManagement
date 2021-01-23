var express = require('express')
var router = express.Router()
const useController = require('../controller/userController')
const verifyTokenmiddleware = require('../middleware/verifyToken') 
require('dotenv').config()


router.get('/myprofile',verifyTokenmiddleware.verifyToken,useController.myProfile)
router.post('/editprofile', verifyTokenmiddleware.verifyToken,useController.editProfile)
router.get('/getallfooditem',verifyTokenmiddleware.verifyToken,useController.getallFoodItem)
router.post('/addtocart', verifyTokenmiddleware.verifyToken,useController.addtoCart)
router.get('/getcount',verifyTokenmiddleware.verifyToken,useController.getCount)
router.get('/getcart',verifyTokenmiddleware.verifyToken,useController.getCart)
router.post('/deletefromcart', verifyTokenmiddleware.verifyToken,useController.deleteFromCart)
router.post('/paytm', verifyTokenmiddleware.verifyToken,useController.paytm)


module.exports = router