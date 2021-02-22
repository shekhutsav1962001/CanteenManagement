var mongoose = require('mongoose')
var feedbackSchema = mongoose.Schema({
    userid: {
        type: String,
    },
    useremail: {
        type: String,
    },
    name: {
        type: String,
    },
    feedback: {
        type: String,
    },
    date: { type: String }
})
module.exports = mongoose.model('feedback', feedbackSchema)

