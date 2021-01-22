var User = require('../models/user')
var Food = require('../models/food')
var Cart = require('../models/cart')

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
        res.status(200).json({ msg: items })
    })
}

function decrementQuantity(req, res, id) {
    Food.findOne({ _id: id }, (error, item) => {
        if (error) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        else {
            var avail = true;
            let qty = item.foodqty;
            if (qty - 1 == 0) {
                avail = false;
            }
            Food.updateOne({ _id: id }, {
                foodqty: qty - 1,
                foodavail: avail
            }, function (err, data) {
                if (err) {
                    console.log("something went wrong!!")
                    res.json({ errormsg: "something went wrong!!" });
                }
                else {
                    const io = req.app.get('io');
                    io.emit("cart", "item added or removed from cart by user");
                    console.log("edited quantity");
                }
            })
        }
    })
}

function secondtimecart(req, res, oldcart, newitem) {
    var oldavail = false;
    var newtotal = oldcart.total + newitem.foodprice;
    var tot;
    var olditemsjsonarray = oldcart['items']

    for (var i = 0; i < olditemsjsonarray.length; i++) {
        if (olditemsjsonarray[i]._id == newitem._id) {
            oldavail = true;
        }
    }
    if (oldavail) {
        console.log("already in cart");
        for (var i = 0; i < olditemsjsonarray.length; i++) {
            if (olditemsjsonarray[i]._id == newitem._id) {
                olditemsjsonarray[i].foodqty += 1;
                oldcart.total += olditemsjsonarray[i].foodprice
                tot = oldcart.total
            }
        }
        Cart.updateOne({ _id: oldcart._id }, {
            items: olditemsjsonarray,
            total: tot
        }, async function (err, ct) {

            if (err) {
                console.log("Somthing went wrong in add to cart")
                res.json({ errormsg: 'Somthing went wrong' })
            }
            else {

                if (newitem.unlimited) {
                    console.log("unlimited");
                    const io = req.app.get('io');
                    io.emit("cart", "item added or removed from cart by user");
                }
                else {
                    var x = await decrementQuantity(req, res, newitem._id);
                    console.log("limited");
                    console.log("item already so incremented done!");
                }
            }
        })
    }
    else {
        console.log("not in cart");
        olditemsjsonarray.push(newitem);
        Cart.updateOne({ _id: oldcart._id }, {
            items: olditemsjsonarray,
            total: newtotal
        }, async function (err, ct) {

            if (err) {
                console.log("Somthing went wrong in add to cart")
                res.json({ errormsg: 'Somthing went wrong' })
            }
            else {
                if (newitem.unlimited) {
                    console.log("unlimited");
                    const io = req.app.get('io');
                    io.emit("cart", "item added or removed from cart by user");
                }
                else {
                    var x = await decrementQuantity(req, res, newitem._id);
                    console.log("limited");
                    console.log("new item  so no increment!");
                }
            }
        })
    }
}

exports.addtoCart = (req, res) => {
    Cart.findOne({ useremail: req.email }, (error, cart) => {
        if (error) {
            console.log("Somthing went wrong in add to cart")
            res.json({ errormsg: 'Somthing went wrong' })
        }
        else {
            if (!cart) {
                console.log("firsttime");
                var cart = new Cart({
                    userid: req.userId,
                    useremail: req.email,
                    items: req.body,
                    total: req.body.foodprice
                });
                cart.save(async (error, ct) => {
                    if (error) {
                        console.log("Somthing went wrong in add to cart")
                        res.json({ errormsg: 'Somthing went wrong' })
                    }
                    else {
                        console.log(req.body.unlimited);
                        if (req.body.unlimited) {
                            console.log("successfully added your first item");
                            res.json({ msg: "successfully added your first item" })
                        }
                        else {
                            var x = await decrementQuantity(req, res, req.body._id);
                            console.log("successfully added your first item");
                            res.json({ msg: "successfully added your first item" })
                        }
                    }
                })
            }
            else {
                console.log("secondtime");
                secondtimecart(req, res, cart, req.body);
                res.json({ msg: "successfully added your item" })
            }
        }
    })

}


exports.getCount = (req, res) => {
    Cart.findOne({ userid: req.userId }, (error, cart) => {
        if (error) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        else {
            var c;
            if (cart) {
                c = cart['items'].length;
            }
            else {
                c = 0
            }
            res.json({ count: c })
        }
    })
}




exports.getCart = (req, res) => {
    Cart.find({ userid: req.userId }, (err, items) => {
        if (err) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        res.send(items)
    })
}


exports.deleteFromCart = (req, res) => {
    Cart.findOne({ userid: req.userId }, (error, cart) => {
        if (error) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        else {
            if (!cart) {
                console.log("something went wrong!!")
                res.json({ errormsg: "something went wrong!!" });
            }
            else {
                // console.log("deleted from cart!");
                // deletefromcart(req, res, cart, req.body, req.userId);
                // console.log(req.body);
                var temp = [];
                var total;
                var olditemjsonarray = cart['items']
                for (var i = 0; i < olditemjsonarray.length; i++) {
                    if (olditemjsonarray[i]._id != req.body._id) {
                        temp.push(olditemjsonarray[i])
                    }
                    else {
                        cart.total -= req.body.foodprice * req.body.foodqty;
                        total = cart.total;
                    }
                }
                // console.log(cart);
                // console.log(total);
                // console.log(temp);
                if (total == 0) {
                    Cart.deleteOne({ _id: cart._id }, (err) => {
                        if (err) {
                            console.log("something went wrong!!")
                            res.json({ errormsg: "something went wrong!!" });
                        }
                    })
                    const io = req.app.get('io');
                    io.emit("cart", "item added or removed from cart by user");
                    res.json({ msg: "item deleted from the cart" })

                }
                else {
                    Cart.updateOne({ _id: cart._id }, {
                        items: temp,
                        total: total
                    }, function (err, ct) {
                        if (err) {
                            console.log("something went wrong!!")
                            res.json({ errormsg: "something went wrong!!" });
                        }
                        else {
                            const io = req.app.get('io');
                            io.emit("cart", "item added or removed from cart by user");
                            console.log("item deleted from  cart");
                            res.json({ msg: "item deleted from the cart" })
                        }
                    })
                }
            }
        }
    })

}