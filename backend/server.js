const express = require('express')
const app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000



// some dependency
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


//database connection
const db = require('./database/db')();


// for testing purpose
app.get('/', (req, res) => {
    res.send("Hello Utsav from Canteen Server")
})



// for debugging
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})


// https://utsav1519demo.herokuapp.com/