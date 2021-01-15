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

//secure http
app.use(helmet());

//database connection
const db = require('./database/db')();

// socket connection
var server = require('http').Server(app);
var io = require('socket.io')(server,
    
    
    {
    cors: {
      origin:'*',
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  }
  
  ); 
app.set('io',io);
io.on('connection', socket => {
    console.log("new  sockeet connection...");
    socket.emit("test event","hey utsav");
});

// for testing purpose
app.get('/', (req, res) => {
    res.send("Hello Utsav from Canteen Server")
})

// use all routes
app.use('/', authRoutes)
app.use('/admin', adminRoutes)
app.use('/user', userRoutes)


// for debugging
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})


