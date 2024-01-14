const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const dotenv=require("dotenv");
require("dotenv").config();
app.use(express.json());  

app.use(cors());
const bodyParser = require('body-parser');
const connectDB= require('./config/db');

connectDB();// to connect with mongodb db which is use for login functionality


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

//set my routes
const signup= require('./routes/Signup')
const hostedroute = require('./routes/stripe/hostedroute')
app.use("/hosted", hostedroute);
app.use("/",signup);
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

