var User = require('../models/user')
var Food = require('../models/food')


exports.myProfile = (req, res) => {
    User.findOne({ _id: req.userId }, (error, user) => {
        if (error) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        else {
            res.status(200).json({ user: user, msg: "all ok from myprofile" })
        }
    }).select("-password").select("-blocked").select("-role")
}


exports.editProfile = (req, res) => {
    let emailchange;
    if (req.email == req.body.email) {
        emailchange = "no"
    }
    else {
        emailchange = "yes"
    }
    User.updateOne({ _id: req.userId }, {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact
    }, function (err, user) {
        if (err) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        else {
            console.log("edited profile");
            res.status(201).json({ msg: "edited profile", emailchange: emailchange });
        }
    })
}


exports.getallFoodItem = (req, res) => {
    Food.find({}, (err, items) => {
        if (err) {
            console.log("some error while fethcing food userhome")
            res.status(500).json({ errormsg: 'Somthing went wrong' })
        }
        res.json({ msg: items })
    })
}
