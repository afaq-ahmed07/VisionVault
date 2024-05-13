const express = require('express');
const path = require('path');
const signinRouter = require('./routes/signin');
const homeRouter= require('./routes/home')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/signin', signinRouter);
app.use('/', homeRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
