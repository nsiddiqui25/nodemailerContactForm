const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

// initialize app variables
const app = express();

// view engine setup 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//body parser middleware
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

//static folder
app.use('/public', express.static(path.join(__dirname, 'public')));


//route
app.get('/', (req, res) => {
   res.render('contact');
});

app.listen(3000, () => console.log('server started'));