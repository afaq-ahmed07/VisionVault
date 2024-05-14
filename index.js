const express = require('express');
const path = require('path');
const router = express.Router();
const signinRouter = require('./routes/signin');
const signupRouter=require('./routes/signup')
const mongoose = require("mongoose");
const User = require('./models/user');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const homeRouter= require('./routes/home')
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
// Middleware to parse form data
app.use(bodyParser.json());

// route management
app.use('/signin', signinRouter);

app.use('/signup',signupRouter);
app.use('/', homeRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//database

require("./config/connect");

// Middleware to parse JSON bodies
//app.use(express.json());
// Configure multer for handling multipart/form-data
//const upload = multer();







// Route for handling POST requests
app.post("/signup", (req, res) => {
    if (Object.keys(req.body).length === 0){
        console.log("error");
    }
    else{
    console.log("Request Body:", req.body);
    const u = req.body.username;
    const p = req.body.password;
    const e = req.body.email;

    //adding new user to database
    const newUser = new User({
    username:u ,
    email: e,
    password: p
    });
  
  newUser.save()
    .then(() => {
      console.log('Saved successfully.');
    })
    .catch((err) => {
      console.error('Error occurred:', err);
    });

    res.status(200).send('OK');
   
    }
    
});

//
app.post("/signin", (req, res) => {
    console.log("Request Body:", req.body);
    res.status(200).send('OK');
});