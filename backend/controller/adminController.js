var multer = require('multer')
var Food = require('../models/food')
// var User = require('../models/user')
// var Otp = require('../models/otp')
const jwt = require('jsonwebtoken')
// var sendMail = require('../mail/mail')
// var bcrypt = require('bcrypt')
require('dotenv').config()


// addfood image
function getTime() {
    var today = new Date().toLocaleDateString()
    today = today.toString().replace('/', '-')
    today = today.replace('/', '-')

    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    today += '-' + h + '-' + m + '-' + s

    return today;
}
var storage = multer.diskStorage({

    destination: (req, file, callBack) => {
        callBack(null, 'G:\\MYWORK\\CanteenManagement\\frontend\\canteen\\src\\assets\\food')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${getTime()}-${file.originalname}`)
    }
})
exports.upload = multer({ storage: storage })




exports.addFood = (req, res) => {
    var file = req.file
    var food = new Food({
        foodname: req.body.foodname,
        foodprice: req.body.foodprice,
        foodimage: file.filename
    })
    try {
        doc = food.save();
        console.log("food added by admin");
        return  res.json({ msg: 'Food added' });
    }
    catch (err) {
        return  res.json({ msg: 'Somthing went wrong' });
    }
   
}


exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("unauthorized req")
    }
    let token = req.headers.authorization.split(' ')[1]
    // console.log(token);
    if (token == 'null') {
        return res.status(401).send("unauthorized req")
    }
    let payload = jwt.verify(token, process.env.SECRETKEY)
    if (!payload) {
        return res.status(401).send("unauthorized req")
    }
    // console.log("in middleware");
    // console.log(payload.subject);
    // console.log(payload.email);
    req.userId = payload.subject;
    req.email = payload.email;
    // console.log(req.userId);
    // console.log(req.email);
    next()
}
