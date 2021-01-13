const express = require('express')
const app = express()
var cors = require('cors')
const helmet = require("helmet");
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

// all routes
var authRoutes = require('./routes/authRoute')
var adminRoutes = require('./routes/adminRoute')
var userRoutes = require('./routes/userRoute')



// some dependency
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

//Secure http
app.use(helmet());

//database connection
const db = require('./database/db')();


// for testing purpose
app.get('/', (req, res) => {
    res.send("Hello Utsav from Canteen Server")
})

// use all routes
app.use('/', authRoutes)
app.use('/admin', adminRoutes)
app.use('/user', userRoutes)


// for debugging
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})


