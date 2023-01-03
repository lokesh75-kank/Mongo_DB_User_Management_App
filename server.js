//using express module
const express = require('express');
//using dotenv module to specifying path to config.env file to use port 3000
const dotenv = require('dotenv');
// using morgan module
const morgan = require('morgan');
// using body parser module
const bodyparser = require('body-parser');
// using path inbuild model of nodejs
const path = require('path');

const app = express(); //intialize this app variable as express instance

const connectDB = require('./server/database/connection');

//calling the dotenv module and port from config.env file
dotenv.config({path:'config.env'})
//create variable port to store the port in dotenv file
const PORT = process.env.PORT||8080

// log request
app.use(morgan('tiny'));

// mongo db connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

// set view engine
app.set("view engine","ejs")  //we have mentioned ejs because we are using ejs template engine

// load assests
app.use('/css',express.static(path.resolve(__dirname,'assests/css')));
app.use('/img',express.static(path.resolve(__dirname,'assests/img')));
app.use('/js',express.static(path.resolve(__dirname,'assests/js')));

// load routers
app.use('/', require('./server/routes/router'))

//listen the server on port
app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});

