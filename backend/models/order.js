var mongoose = require('mongoose')
var orderSchema = mongoose.Schema({
    userid: {
        type: String,
    },
    useremail: {
        type: String,
    },
    items: {
        type: Array,
        default: []
    },
    total: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "placed"
    },
    paymentstatus: {
        type: String,
        default: "unpaid"
    },
    contact: {
        type: String,
        required: true,
    },
    orderdate: { type: String }
})
module.exports = mongoose.model('order', orderSchema)

