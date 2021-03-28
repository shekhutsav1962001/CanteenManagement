var User = require('../models/user')
var Food = require('../models/food')
var Cart = require('../models/cart')
var Order = require('../models/order')
var Feedback = require('../models/feedback')
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
    Food.find({ foodavail: true }, (err, items) => {
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



async function SaveinOrder(req, res, cart) {
    var today = new Date();
    var date = today.toJSON().slice(0, 10);
    var errormessage = "";
    const allitems = cart.items;

    for (let i = 0; i < allitems.length; i++) {
        const oneitem = allitems[i];
        const oneitemid = oneitem._id;
        const oneitemqty = oneitem.foodqty;
        await Food.findById(oneitemid, (err, orignalitem) => {
            if (err) {
                console.log("something went wrong!!")
                res.json({ errormsg: "something went wrong!!" });
            }
            else {
                if (!orignalitem.unlimited) {
                    const orignalitemqty = orignalitem.foodqty;
                    if (orignalitemqty - oneitemqty < 0) {
                        errormessage += " " + orignalitem.foodname
                    }
                }
                else {
                    if (!orignalitem.foodavail) {

                        errormessage += " " + orignalitem.foodname
                    }
                }
            }
        });
    }
    // console.log(errormessage);
    if (errormessage != "") {
        errormessage += " currently not available";
        res.json({ errormsg: errormessage });
    }
    else {
        for (let i = 0; i < allitems.length; i++) {
            const oneitem = allitems[i];
            const oneitemid = oneitem._id;
            const oneitemqty = oneitem.foodqty;

            await Food.findOne({ _id: oneitemid }, async (err, onefooditem) => {
                if (err) {
                    console.log("something went wrong!!")
                    res.json({ errormsg: "something went wrong!!" });
                }
                if (!onefooditem) {
                    console.log("something went wrong!!")
                    res.json({ errormsg: "something went wrong!!" });
                }
                else {
                    if (!onefooditem.unlimited) {
                        let avail = true;
                        if (onefooditem.foodqty - oneitemqty <= 0) {
                            avail = false;
                        }
                        await Food.updateOne({ _id: oneitemid }, {
                            foodqty: onefooditem.foodqty - oneitemqty,
                            foodavail: avail
                        }, function (err, done) {
                            if (err) {
                                console.log("something went wrong!!")
                                res.json({ errormsg: "something went wrong!!" });
                            }
                            else {
                                console.log("order placed step1");

                            }
                        })
                    }
                }
            })
        }
        User.findOne({ _id: req.userId }, async (error, user) => {
            if (error) {
                console.log("something went wrong!!")
                res.json({ errormsg: "something went wrong!!" });
            }
            else {
                var order = new Order({
                    userid: cart.userid,
                    useremail: cart.useremail,
                    items: cart.items,
                    total: cart.total,
                    orderdate: date,
                    contact: user.contact
                })
                order.save(async (err, a) => {
                    if (err) {
                        console.log("something went wrong!!")
                        res.json({ errormsg: "something went wrong!!" });
                    }
                    else {
                        console.log("order saved in order table");
                        // var y = await Place(req, res)
                    }
                })
                var y = await Place(req, res)
            }
        })

    }
}

async function Place(req, res) {
    await Cart.deleteOne({ userid: req.userId }, (err) => {
        if (err) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
    })
    console.log("order placed so deleted from cart");
    const io = req.app.get('io');
    io.emit("neworderplaced", "New order placed by some user!");
    res.json({ msg: "successfully order placed" });
}



exports.placeOrder = (req, res) => {
    Cart.findOne({ userid: req.userId }, async (err, cart) => {
        if (err) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        var x = await SaveinOrder(req, res, cart)
    })
}


exports.getAllUserOrders = (req, res) => {
    var today = new Date();
    var date = today.toJSON().slice(0, 10);
    // status: { $ne: "completed" },
    Order.find({ orderdate: date, userid: req.userId }, (err, orders) => {
        if (err) {
            console.log("error in get all order userside");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            orders = orders.reverse()
            res.json({ msg: orders });
        }
    })
}

exports.getAllUserOrders2 = (req, res) => {
    var today = new Date();
    var date = today.toJSON().slice(0, 10);
    // status: { $ne: "completed" },
    Order.find({ orderdate: date, userid: req.userId }, async (err, orders) => {
        if (err) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        orders = orders.reverse()
        res.send(orders);
    })
}

exports.getoneOrder = (req, res) => {
    var id = req.params.id
    Order.find({ _id: id }, (err, order) => {
        if (err) {
            console.log("error in get one order by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        return res.send(order);
    })
}

exports.sendFeedback = (req, res) => {
    var today = new Date();
    var date = today.toJSON().slice(0, 10);
    var fb = new Feedback({
        userid: req.userId,
        useremail: req.email,
        name: req.body.name,
        feedback: req.body.feedback,
        date: date
    })
    fb.save(async (error, a) => {
        if (error) {
            console.log("something went wrong while sending feedback!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        else {
            console.log("successfully send your feedback");
            res.json({ msg: "successfully send your feedback" });
        }
    })
}


exports.qrCode = (req, res) => {
    var id = req.body.id
    Order.findOne({ _id: id }, (err, order) => {
        if (err) {
            console.log("error while scanning qr code of by user");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        if (order.paymentstatus == "paid") {
            if (order.status == "completed") {
                Order.updateOne({ _id: req.body.id }, { status: "picked up" }, (err, done) => {
                    if (err) {
                        console.log("error while scanning qr code and updating status of by user");
                        return res.json({ errormsg: 'Somthing went wrong' });
                    }
                    else {
                        console.log("order status is updated with qr code");
                        const io = req.app.get('io');
                        io.emit(req.body.email, "order status updated");
                        io.emit("orderdelete", "order status updated");
                        res.json({ msg: "successfully order confirmation done" });
                    }
                })
            }
            else {
                console.log("your order is preparing");
                return res.json({ errormsg: 'your order is preparing' });
            }
        }
        else {
            console.log("your payment status must be paid");
            return res.json({ errormsg: 'you need to pay first' });
        }
    })
}



exports.paymentDone = (req, res) => {
    Order.updateOne({ _id: req.body.id }, { paymentstatus: "paid" }, (err, done) => {
        if (err) {
            console.log("error in paytm gateway by user");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            console.log("order payment status updated by paytm gateway");
            const io = req.app.get('io');
            io.emit(req.body.email, "payment status updated");
            io.emit("orderdelete", "payment status updated");
            res.json({ msg: "successfully updated payment status!" });
        }
    })
}

exports.paymentDoneWeb = (req, res) => {
    Order.updateOne({ _id: req.body.id }, { paymentstatus: "paid" }, (err, done) => {
        if (err) {
            console.log("error in paytm gateway by user");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            console.log("order payment status updated by paytm gateway");
            const io = req.app.get('io');
            io.emit(req.body.email, "payment status updated");
            io.emit("orderdelete", "payment status updated");
            res.json({ msg: "successfully updated payment status!" });
        }
    })
}