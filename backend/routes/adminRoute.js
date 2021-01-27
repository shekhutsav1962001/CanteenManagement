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

module.exports = router