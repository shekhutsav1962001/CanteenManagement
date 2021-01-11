var Food = require('../models/food')


exports.addFood = (req, res) => {
    var file = req.file
    var food = new Food({
        foodname: req.body.foodname,
        foodqty : req.body.foodqty,
        foodprice: req.body.foodprice,
        foodimage: file.filename
    })
    try {
        doc = food.save();
        console.log("food added by admin");
        return res.json({ msg: 'Food added' });
    }
    catch (err) {
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
    console.log(req.body);
    Food.updateOne({ _id: req.body._id }, {
        foodname: req.body.foodname,
        foodprice: req.body.foodprice,
        foodqty : req.body.foodqty
    }, function (err, items) {

        if (err) {
            console.log("some error")
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            console.log("Edited food without image");
            return res.json({msg: 'Edited food without image' });
        }
    })
}

exports.editFoodWithImage = (req, res) => {
    var file = req.file
    Food.updateOne({ _id: req.body._id }, {
        foodname: req.body.foodname,
        foodprice: req.body.foodprice,
        foodqty : req.body.foodqty,
        foodimage: file.filename

    }, function (err, items) {
        if (err) {
            console.log("some error")
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            console.log("Edited food with image");
            return res.json({msg: 'Edited food with image' });
        }
    })
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



