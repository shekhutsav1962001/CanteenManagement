var Food = require('../models/food')


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


