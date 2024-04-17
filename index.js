const express = require('express');
const path = require('path');
const signinRouter = require('./routes/signin');

const app = express();

// Set the views directory
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


// Set EJS as the view engine
app.set('view engine', 'ejs');

// Use the signinRouter for the /signin route
app.use('/signin', signinRouter);

// Route handler for the home page
app.get('/', (req, res) => {
    const pageTitle = 'Home';
    res.render('index', { pageTitle });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
