var User = require('../models/user')
var Otp = require('../models/otp')
const jwt = require('jsonwebtoken')
var sendMail = require('../mail/mail')
var bcrypt = require('bcrypt')
require('dotenv').config()

exports.getCheck = (req, res, next) => {
    res.json({ msg: "All ok" })
}


exports.register = async (req, res) => {
    var user = new User({
        contact: req.body.phone,
        email: req.body.email,
        name:req.body.name,
        role: "user",
        password: User.hashPassword(req.body.p1),
    });
    User.find({ email: req.body.email }, (err, users) => {

        if (err) {
            console.log("error in finding email ");
            res.json({ msg: "some error!" });
        }
        if (users.length != 0) {
            console.log("already user with this email");
            res.json({ msg: "already user exist with this email!" });
        }
        else {
            user.save((error, registeredUser) => {
                if (error) {
                    console.log("some error");
                    res.json({ msg: "some error!" });
                }
                else {
                    let payload = { subject: registeredUser._id }
                    let token = jwt.sign(payload, process.env.SECRETKEY)
                    console.log("successfully user registered!");
                    res.status(200).json({ token: token, message:"successfully user registered!" })
                }
            })
        }
    })
}


exports.logIn = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log(err)
            res.json({ msg: "Somthing went wrong" });
        }
        else {
            if (!user) {
                res.json({ msg: 'Invalid Email!!' })
            }
            else {
                bcrypt.compare(req.body.p1, user.password).then(match => {
                    if (match) {
                        console.log("login sucesssss");
                        let payload = { subject: user._id,email:user.email }
                        let token = jwt.sign(payload, process.env.SECRETKEY)
                        res.status(200).json({ token: token, role: user.role, blocked: user.blocked })
                    }
                    else {
                        console.log("incoreect passss");
                        res.json({ msg: 'Incorrect password!!' })
                    }
                }).catch(err => {
                    console.log("somthing wrong");
                    res.json({ msg: 'Somthing went wrong' })
                })
            }
        }
    })
}
function getEmail(email) {
    Otp.find({ email: email }, (err, otps) => {

        if (err) {
            console.log("err in finding email ");
        }
        if (otps.length != 0) {
            console.log("yes in delete");
            Otp.deleteOne({ email: email }, (err) => {
                if (err)
                    console.log("err in delete");
            }
            )
        }
    })
}

exports.Reset = (req, res) => {
    User.find({ email: req.body.email }, async (err, users) => {

        if (err) {
            console.log("err in finding email ");
            res.json({ msg: "some error!" });
        }
        if (users.length == 0) {
            console.log("user does not exist with this email at forgot password!!");
            res.json({ msg: "user does not exist with this email" });
        }
        else {
            var email = req.body.email
            var x = await getEmail(req.body.email)
            setTimeout(async function () {
                console.log("timeout (2min)");
                var y = await getEmail(email)
            }, 2 * 60000);
            var a = Math.floor(1000 + Math.random() * 9000);
            var otp = new Otp({
                otp: a,
                email: req.body.email
            });
            console.log("otp =", otp);
            try {
                doc = otp.save();
                sendMail(otp.email, otp.otp);
                res.status(201).json({ message: "all ok otp has been send" });
            }
            catch (err) {
                res.json({ msg: "some error!" });
            }
        }
    })
}


exports.resestPasswordDone = (req, res) => {
    User.findOne({ email: req.body.email }, async (err, user) => {
        if (err) {
            console.log(err)
            res.json({ msg: "Somthing went wrong" });
        }
        else {
            if (!user) {
                res.json({ msg: 'User does not exist with this email!!' })
            }
            else {
                Otp.findOne({ email: req.body.email }, async (err, otps) => {

                    if (err) {
                        res.json({ msg: "Somthing went wrong" });
                    }
                    if (!otps) {
                        res.json({ msg: "Somthing went wrong" });
                    }
                    else {
                        var otp = otps.otp;
                        if (otp != req.body.otp) {
                            res.json({ msg: "Invalid Otp!!!" });
                        }
                        else {
                            var p = User.hashPassword(req.body.p1)
                            var x = await getEmail(req.body.email)
                            User.updateOne({ email: req.body.email },
                                { password: p }, function (err, user) {
                                    console.log(1);
                                    if (err) {
                                        console.log(err)
                                        res.json({ msg: "Somthing went wrong" });
                                    }
                                    else {
                                        res.json({ message: "password updated!!" });
                                    }
                                });
                        }
                    }
                })


            }
        }
    })
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
