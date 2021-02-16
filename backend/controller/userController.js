var User = require('../models/user')
var Food = require('../models/food')
var Cart = require('../models/cart')
var Order = require('../models/order')
const checksum_lib = require('../checksum/checksum');
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
                    // **************************************************
                    // const io = req.app.get('io');
                    // io.emit("cart", "item added or removed from cart by user");
                    // **************************************************
                    console.log("edited(decrement) quantity");
                }
            })
        }
    })
}

function intcrementQuantity(req, res, id) {
    Food.findOne({ _id: id }, (error, item) => {
        if (error) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        else {
            let qty = item.foodqty;
            qty += req.body.foodqty;
            Food.updateOne({ _id: id }, {
                foodqty: qty,
                foodavail: true
            }, function (err, data) {
                if (err) {
                    console.log("something went wrong!!")
                    res.json({ errormsg: "something went wrong!!" });
                }
                else {
                    // **************************************************
                    // const io = req.app.get('io');
                    // io.emit("cart", "item added or removed from cart by user");
                    // **************************************************
                    console.log("edited(increment) quantity");
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
                    // **************************************************
                    // var x = await decrementQuantity(req, res, newitem._id);
                    // **************************************************
                    const io = req.app.get('io');
                    io.emit("cart", "item added or removed from cart by user");
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
                    // **************************************************
                    // var x = await decrementQuantity(req, res, newitem._id);
                    // **************************************************
                    const io = req.app.get('io');
                    io.emit("cart", "item added or removed from cart by user");
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
                            const io = req.app.get('io');
                            io.emit("cart", "item added or removed from cart by user");
                            console.log("successfully added your first item");
                            res.json({ msg: "successfully added your first item" })
                        }
                        else {
                            // **************************************************
                            // var x = await decrementQuantity(req, res, req.body._id);
                            // **************************************************
                            const io = req.app.get('io');
                            io.emit("cart", "item added or removed from cart by user");
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
                    if (req.body.unlimited) {
                        console.log("delete in unlimited");
                    }
                    else {
                        // *************************************************
                        // intcrementQuantity(req,res,req.body._id)
                        // **************************************************
                    }
                    const io = req.app.get('io');
                    io.emit("cart", "item added or removed from cart by user");
                    res.json({ msg: "item deleted from the cart", empty: true })

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
                            if (req.body.unlimited) {
                                console.log("delete in unlimited");
                            }
                            else {
                                // **************************************************
                                // intcrementQuantity(req,res,req.body._id)
                                // **************************************************
                            }
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



function SaveinOrder(req, res, cart) {
    var today = new Date();
    var date = today.toJSON().slice(0, 10);
    console.log(cart);
    console.log(cart.items);
    console.log(cart.total);
    var order = new Order({
        userid: cart.userid,
        useremail: cart.useremail,
        items: cart.items,
        total: cart.total,
        orderdate: date
    })
    order.save(async (error, a) => {
        if (error) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        else {
            console.log("order saved in order table");
            var y = await Place(req, res)
        }
    })
}

function Place(req, res) {
    Cart.deleteOne({ userid: req.userId }, (err) => {
        if (err) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
    })
    console.log("order placed so deleted from cart");
}



exports.placeOrder = (req, res) => {
    Cart.findOne({ userid: req.userId }, async (err, cart) => {
        if (err) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        console.log(
            cart
        );
        var x = await SaveinOrder(req, res, cart)
        res.json({ msg: "successfully order placed" });
    })
}


exports.getAllUserOrders = (req, res) => {
    Order.find({ userid: req.userId }, async (err, orders) => {
        if (err) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        res.json({ msg: orders });
    })
}







var PaytmConfig = {
    mid: "VrUGmx97200583132245",
    key: "sPaB9mM%rr9f7GUF",
    website: "WEBSTAGING"
}



exports.paytm = (req, res) => {

    var params = {};
    params['MID'] = PaytmConfig.mid;
    params['WEBSITE'] = PaytmConfig.website;
    params['CHANNEL_ID'] = 'WEB';
    params['INDUSTRY_TYPE_ID'] = 'Retail';
    params['ORDER_ID'] = 'TEST_' + new Date().getTime();
    params['CUST_ID'] = 'Customer001';
    params['TXN_AMOUNT'] = '11.00';
    params['CALLBACK_URL'] = 'http://localhost:' + 3000 + '/';
    params['EMAIL'] = 'deepdonda007@gmail.com';
    params['MOBILE_NO'] = '6353694040';

    checksum_lib.genchecksum(params, PaytmConfig.key, function (err, checksum) {

        var txn_url = "https://securegw-stage.paytm.in/order/process"; // for staging
        var form_fields = "";
        for (var x in params) {
            form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
        }
        form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";
        // console.log(form_fields);
        // res.writeHead(200, { 'Content-Type': 'text/html' });
        var x = '<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>'
        console.log(x);
        res.write(x);
        res.end();
        // res.json({msg:"all ok"})
    });

}