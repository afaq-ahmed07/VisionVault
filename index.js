const express = require('express');
const bcrypt = require('bcrypt');

const path = require('path');
const router = express.Router();
const signinRouter = require('./routes/signin');
const signupRouter=require('./routes/signup')
const emailRouter=require('./routes/email')
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const homeRouter= require('./routes/home')

//database
require("./config/connect");



app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


//app.use(express.json()); // For parsing application/json
// Middleware to parse form data
app.use(bodyParser.json());

// route management
app.use('/signin', signinRouter);

app.use('/signup',signupRouter);

app.use('/email-page',emailRouter);

app.use('/', homeRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});






app.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).send('Invalid username or password');
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid username or password');
        }
        // Generate a JWT
        const token = jwt.sign({ username: user.username,email:user.email }, 'Nevergiveup', { expiresIn: '1h' });

        // Send the JWT in an HTTP-only cookie
        res.cookie('authToken', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // 1 hour
        res.status(200).send('Sign-in successful');

    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).send('Internal Server Error');
    }
});
