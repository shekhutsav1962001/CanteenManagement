var Food = require('../models/food')


exports.addFood = (req, res) => {
    var file = req.file
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
        var food = new Food({
            foodname: req.body.foodname,
            foodqty: qty,
            foodprice: req.body.foodprice,
            foodimage: file.filename,
            foodavail: avail
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

exports.editFoodWithImage = (req, res) => {
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
        var file = req.file
        console.log(req.body.foodqty);
        Food.updateOne({ _id: req.body._id }, {
            foodname: req.body.foodname,
            foodprice: req.body.foodprice,
            foodqty: qty,
            foodimage: file.filename,
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
            const io = req.app.get('io');
            io.emit("foodcrudbyadmin", " food crud operation done by admin!");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
    })
    return res.json({ msg: 'food deleted by admin' });
}



