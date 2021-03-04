require('dotenv').config()
var Food = require('../models/food')
var User = require('../models/user')
var Order = require('../models/order')
var Feedback = require('../models/feedback')
var QRCode = require('qrcode')
const fileUploadmiddleware = require('../middleware/fileUpload')

exports.addFood = async (req, res) => {
    // var file = req.file
    let avail;
    let qty;
    let limit;
    if (!isNaN(req.body.foodqty)) {

        if (req.body.foodqty <= 0) {
            avail = false;
            qty = 0;
            limit = false;
        }
        else {
            avail = true;
            qty = req.body.foodqty;
            limit = false;
        }
        if (req.body.foodqty == -1) {
            avail = true;
            qty = -1;
            limit = true;
        }
        // **********************
        try {
            const image = req.file
            const imageUrl = await fileUploadmiddleware.uploadImage(image)
            var food = new Food({
                foodname: req.body.foodname,
                foodqty: qty,
                foodprice: req.body.foodprice,
                // foodimage: file.filename,
                foodimage: imageUrl,
                foodavail: avail,
                unlimited: limit
            })
            try {
                doc = food.save();
                console.log("food added by admin");
                const io = req.app.get('io');
                io.emit("foodcrudbyadmin", " food crud operation done by admin!");
                return res.json({ msg: 'Food added' });
            }
            catch (err) {
                console.log("some error while adding food by admin")
                return res.json({ errormsg: 'Somthing went wrong' });
            }
        }
        catch (err) {
            console.log("some error while adding food by admin")
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        // **********************

    }
    else {
        console.log("Invalid Quantity!");
        return res.json({ errormsg: 'Invalid Quantity!' });
    }
}


exports.getallFoodItem = (req, res) => {

    Food.find({}, (err, items) => {
        if (err) {
            console.log("some error while fetching all food by admin")
            res.status(500).json({ errormsg: 'Somthing went wrong' })
        }
        res.json({ msg: items })
    })
}


exports.editFood = (req, res) => {
    let avail;
    let qty;
    if (!isNaN(req.body.foodqty)) {
        if (req.body.foodqty <= 0) {
            avail = false;
            qty = 0;
        }
        else {
            avail = true;
            qty = req.body.foodqty
        }
        if (req.body.foodqty == -1) {
            // avail = true;

            qty = -1;
            if (req.body.isitavail == "yes") {
                avail = true;
            }
            else {
                avail = false;
            }
        }
        Food.updateOne({ _id: req.body._id }, {
            foodname: req.body.foodname,
            foodprice: req.body.foodprice,
            foodqty: qty,
            foodavail: avail
        }, function (err, item) {

            if (err) {
                console.log("some error in edit food without image")
                return res.json({ errormsg: 'Somthing went wrong' });
            }
            else {
                console.log("Edited food without image");
                const io = req.app.get('io');
                io.emit("foodcrudbyadmin", " food crud operation done by admin!");
                return res.json({ msg: 'Edited food without image' });
            }
        })
    }
    else {
        console.log("Invalid Quantity!");
        return res.json({ errormsg: 'Invalid Quantity!' });
    }


}

exports.editFoodWithImage = async (req, res) => {
    let avail;
    let qty;
    if (!isNaN(req.body.foodqty)) {
        if (req.body.foodqty <= 0) {
            avail = false;
            qty = 0;
        }
        else {
            avail = true;
            qty = req.body.foodqty;
        }
        if (req.body.foodqty == -1) {
            // avail = true;
            qty = -1;
            if (req.body.isitavail == "yes") {
                avail = true;
            }
            else {
                avail = false;
            }
        }
        try {
            Food.findOne({ _id: req.body._id }, async (err, data) => {
                if (err) {
                    console.log("error in delete food by admin");
                    return res.json({ errormsg: 'Somthing went wrong' });
                }
                else {
                    if (!data) {
                        console.log("error in delete food by admin");
                        return res.json({ errormsg: 'Somthing went wrong' });
                    }
                    else {
                        try {
                            var x = await fileUploadmiddleware.deleteImage(data.foodimage);
                            const image = req.file
                            const imageUrl = await fileUploadmiddleware.uploadImage(image)
                            Food.updateOne({ _id: req.body._id }, {
                                foodname: req.body.foodname,
                                foodprice: req.body.foodprice,
                                foodqty: qty,
                                // foodimage: file.filename,
                                foodimage: imageUrl,
                                foodavail: avail
                            }, function (err, item) {
                                if (err) {
                                    console.log("some error in edit food with image")
                                    return res.json({ errormsg: 'Somthing went wrong' });
                                }
                                else {
                                    console.log("Edited food with image");
                                    const io = req.app.get('io');
                                    io.emit("foodcrudbyadmin", " food crud operation done by admin!");
                                    return res.json({ msg: 'Edited food with image' });
                                }
                            })
                        } catch (error) {
                            console.log("error in delete food by admin");
                            return res.json({ errormsg: 'Somthing went wrong' });
                        }

                    }

                }

            })
        }
        catch (err) {
            console.log("some error while editing  food with image by admin")
            return res.json({ errormsg: 'Somthing went wrong' });
        }

    }
    else {
        console.log("Invalid Quantity!");
        return res.json({ errormsg: 'Invalid Quantity!' });
    }


}

exports.deleteFood = (req, res) => {

    Food.findOne({ _id: req.params.id }, async (err, data) => {
        if (err) {
            console.log("error in delete food by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            if (!data) {
                console.log("error in delete food by admin");
                return res.json({ errormsg: 'Somthing went wrong' });
            }
            else {
                try {
                    var x = await fileUploadmiddleware.deleteImage(data.foodimage);
                    Food.deleteOne({ _id: req.params.id }, (error) => {
                        if (error) {
                            console.log("error in delete food by admin");
                            return res.json({ errormsg: 'Somthing went wrong' });
                        }
                    })
                    const io = req.app.get('io');
                    io.emit("foodcrudbyadmin", " food crud operation done by admin!");
                    return res.json({ msg: 'food deleted by admin' });
                } catch (error) {
                    console.log("error in delete food by admin");
                    return res.json({ errormsg: 'Somthing went wrong' });
                }

            }

        }

    })
}

exports.getallUser = (req, res) => {
    User.find({ role: "user" }, (err, usr) => {
        if (err) {
            console.log("error in get all user by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            res.json({ user: usr });
        }
    }).select("-password").select("-role")
}


exports.block = (req, res) => {
    var id = req.params.id
    User.updateOne({ _id: id }, { blocked: true }, (err, user) => {
        if (err) {
            console.log("error in block user by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            console.log("blocked user");
            res.status(201).json({ msg: "blocked user!" });
        }
    })

}
exports.unblock = (req, res) => {
    var id = req.params.id
    User.updateOne({ _id: id }, { blocked: false }, (err, user) => {
        if (err) {
            console.log("error in unblock user by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            console.log("unblocked user");
            res.status(201).json({ msg: "unblocked user!" });
        }
    })
}



exports.getallOrders = (req, res) => {
    var today = new Date();
    var date = today.toJSON().slice(0, 10);
    // unpaid
    // picked up
    Order.find({ $or: [{ status: { $ne: "picked up" } }, { paymentstatus: "unpaid" }], orderdate: date }, (err, orders) => {
        if (err) {
            console.log("error in get all order by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            // console.log(orders);
            res.json({ msg: orders });
        }
    }).select("-items").select("-orderdate")
}



exports.updateorderstatus = (req, res) => {
    // console.log(req.body.email);
    Order.updateOne({ _id: req.body.id }, { status: req.body.status }, (err, done) => {
        if (err) {
            console.log("error in update status of order by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            console.log("order status updated");
            const io = req.app.get('io');
            io.emit(req.body.email, "order status updated");
            res.json({ msg: "successfully updated order status!" });
        }
    })
}



exports.deleteOrder = (req, res) => {
    Order.deleteOne({ _id: req.params.id }, (error) => {
        if (error) {
            console.log("error in delete order by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
    })
    const io = req.app.get('io');
    io.emit("orderdelete", "order deleted by admin!");
    return res.json({ msg: 'food deleted by admin' });
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


exports.getOneuser = (req, res) => {
    var id = req.params.id
    User.findOne({ _id: id }, (err, user) => {
        if (err) {
            console.log("error in get one user by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        res.status(200).json({ msg: user })
    }).select("-password").select("-role").select("-blocked").select("-_id")
}


exports.getorderHistory = (req, res) => {
    var date = req.params.date
    var emptyarray = []
    let total = 0;
    Order.find({ orderdate: date }, (err, orders) => {
        if (err) {
            console.log("error in get order history  by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        for (let i = 0; i < orders.length; i++) {
            let element = orders[i];
            element = element.items
            for (let j = 0; j < element.length; j++) {
                let temp = { _id: element[j]._id, foodqty: element[j].foodqty, foodprice: element[j].foodprice, foodname: element[j].foodname, foodimage: element[j].foodimage }
                let k = 0
                for (k = 0; k < emptyarray.length; k++) {
                    if (emptyarray[k]._id == element[j]._id) {
                        emptyarray[k].foodqty += element[j].foodqty
                        total += element[j].foodqty * element[j].foodprice
                        break;
                    }
                }
                if (k == emptyarray.length) {
                    total += element[j].foodqty * element[j].foodprice
                    emptyarray.push(temp)
                }
            }
        }
        res.json({ msg: emptyarray, total: total })
    })
}


exports.updatePaymentstatus = (req, res) => {
    Order.updateOne({ _id: req.body.id }, { paymentstatus: req.body.paymentstatus }, (err, done) => {
        if (err) {
            console.log("error in update payment status of order by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            console.log("order  payment status updated");
            const io = req.app.get('io');
            io.emit(req.body.email, "order status updated");
            res.json({ msg: "successfully updated order payment status!" });
        }
    })
}


exports.getQrcode = (req, res) => {
    var id = req.params.id
    Order.findOne({ _id: id }, (err, order) => {
        if (err) {
            console.log("error while generating qr code of order by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        if (order.status == "completed" || order.status == "picked up") {
            QRCode.toDataURL(id).then(url => {
                res.json({ msg: url });
            }).catch(err => {
                console.log("error while generating qr code of order by admin");
                return res.json({ errormsg: 'error while generating qr code' });
            })
        }
        else {
            console.log("order status must be completed or pickup for getting QR code");
            return res.json({ errormsg: 'error while generating qr code' });
        }
    })
}



exports.getallFeedback = (req, res) => {
    Feedback.find({}, (err, feedbacks) => {
        if (err) {
            console.log("error in get all feedback by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            feedbacks = feedbacks.reverse() 
            res.json({ msg: feedbacks });
        }
    })
}


exports.deleteFeedback = (req, res) => {
    Feedback.deleteOne({ _id: req.params.id }, (error) => {
        if (error) {
            console.log("error in delete feedback by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
    })
    return res.json({ msg: 'successfully feedback deleted' });
}