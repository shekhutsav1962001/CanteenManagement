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
router.post('/placeorder', verifyTokenmiddleware.verifyToken,useController.placeOrder)
router.get('/getalluserorders', verifyTokenmiddleware.verifyToken,useController.getAllUserOrders)
router.get('/getalluserorders2', verifyTokenmiddleware.verifyToken,useController.getAllUserOrders2)
router.get('/getoneorder/:id',verifyTokenmiddleware.verifyToken,useController.getoneOrder)
router.post('/sendfeedback', verifyTokenmiddleware.verifyToken,useController.sendFeedback)
router.post('/qrcode', verifyTokenmiddleware.verifyToken,useController.qrCode)
router.post('/paymentdone', verifyTokenmiddleware.verifyToken,useController.paymentDone)
router.post('/paymentdoneweb',useController.paymentDoneWeb)
// aa
module.exports = router