var Food = require('../models/food')


exports.addFood = (req, res) => {
    var file = req.file
    var food = new Food({
        foodname: req.body.foodname,
        foodqty: req.body.foodqty,
        foodprice: req.body.foodprice,
        foodimage: file.filename
    })
    try {
        doc = food.save();
        console.log("food added by admin");
        return res.json({ msg: 'Food added' });
    }
    catch (err) {
        console.log("some error while adding food by admin")
        return res.json({ errormsg: 'Somthing went wrong' });
    }

}


exports.getallFoodItem = (req, res) => {

    Food.find({}, (err, items) => {
        if (err) {
            res.status(500).json({ errormsg: err })
        }
        res.json({ msg: items })
    })
}


exports.editFood = (req, res) => {
    let avail;
    if (req.body.foodqty) {
        if (!isNaN(req.body.foodqty)) {
            if (req.body.foodqty <= 0) {
                avail = false;
            }
            else {
                avail = true;
            }
            Food.updateOne({ _id: req.body._id }, {
                foodname: req.body.foodname,
                foodprice: req.body.foodprice,
                foodqty: req.body.foodqty,
                foodavail: avail
            }, function (err, item) {

                if (err) {
                    console.log("some error in edit food without image")
                    return res.json({ errormsg: 'Somthing went wrong' });
                }
                else {
                    console.log("Edited food without image");
                    return res.json({ msg: 'Edited food without image' });
                }
            })
        }
        else {
            console.log("Invalid Quantity!");
            return res.json({ errormsg: 'Invalid Quantity!' });
        }
    }
    else {
        console.log("Invalid Quantity!");
        return res.json({ errormsg: 'Invalid Quantity!' });
    }


}

exports.editFoodWithImage = (req, res) => {
    let avail;
    if (req.body.foodqty) {
        if (!isNaN(req.body.foodqty)) {
            if (req.body.foodqty <= 0) {
                avail = false;
            }
            else {
                avail = true;
            }
            var file = req.file
            console.log(req.body.foodqty);
            Food.updateOne({ _id: req.body._id }, {
                foodname: req.body.foodname,
                foodprice: req.body.foodprice,
                foodqty: req.body.foodqty,
                foodimage: file.filename,
                foodavail: avail
            }, function (err, item) {
                if (err) {
                    console.log("some error in edit food with image")
                    return res.json({ errormsg: 'Somthing went wrong' });
                }
                else {
                    console.log("Edited food with image");
                    return res.json({ msg: 'Edited food with image' });
                }
            })
        }
        else {
            console.log("Invalid Quantity!");
            return res.json({ errormsg: 'Invalid Quantity!' });
        }
    }
    else {
        console.log("Invalid Quantity!");
        return res.json({ errormsg: 'Invalid Quantity!' });
    }


}

exports.deleteFood = (req, res) => {
    Food.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            console.log("error in delete food by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
    })
    return res.json({ msg: 'food deleted by admin' });
}



