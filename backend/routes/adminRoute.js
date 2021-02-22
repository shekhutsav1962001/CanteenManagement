var express = require('express')
var router = express.Router()
const adminController = require('../controller/adminController')
const verifyTokenmiddleware = require('../middleware/verifyToken') 
const fileUploadmiddleware = require('../middleware/fileUpload') 
require('dotenv').config()

router.get('/abc', (req, res) => {
    console.log(process.env.ABC)
    console.log(process.env.PQR)
    res.send("hello get abc");
})

// router.post('/addfood', verifyTokenmiddleware.verifyToken, fileUploadmiddleware.upload.single('file'), adminController.addFood )
// router.post('/editfoodwithimage', verifyTokenmiddleware.verifyToken, fileUploadmiddleware.upload.single('file'), adminController.editFoodWithImage )


router.post('/addfood', verifyTokenmiddleware.verifyToken, adminController.addFood )
router.get('/getallfooditem',verifyTokenmiddleware.verifyToken,adminController.getallFoodItem)
router.post('/editfood',verifyTokenmiddleware.verifyToken,adminController.editFood)
router.post('/editfoodwithimage', verifyTokenmiddleware.verifyToken, adminController.editFoodWithImage )
router.delete('/deletefood/:id',verifyTokenmiddleware.verifyToken,adminController.deleteFood)
router.get('/getalluser',verifyTokenmiddleware.verifyToken,adminController.getallUser)
router.delete('/blockuser/:id',verifyTokenmiddleware.verifyToken,adminController.block)
router.delete('/unblockuser/:id',verifyTokenmiddleware.verifyToken,adminController.unblock)
router.get('/getallorders',verifyTokenmiddleware.verifyToken,adminController.getallOrders)
router.post('/updateorderstatus',verifyTokenmiddleware.verifyToken,adminController.updateorderstatus)
router.delete('/deleteorder/:id',verifyTokenmiddleware.verifyToken,adminController.deleteOrder)
router.get('/getoneorder/:id',verifyTokenmiddleware.verifyToken,adminController.getoneOrder)
router.get('/getoneuser/:id',verifyTokenmiddleware.verifyToken,adminController.getOneuser)
router.get('/getorderhistory/:date',verifyTokenmiddleware.verifyToken,adminController.getorderHistory)
router.post('/updatepaymentstatus',verifyTokenmiddleware.verifyToken,adminController.updatePaymentstatus)
router.get('/getqrcode/:id',verifyTokenmiddleware.verifyToken,adminController.getQrcode)
router.get('/getallfeedback',verifyTokenmiddleware.verifyToken,adminController.getallFeedback)
router.delete('/deletefeedback/:id',verifyTokenmiddleware.verifyToken,adminController.deleteFeedback)

module.exports = router