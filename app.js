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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

//route
app.get('/', (req, res) => {
   res.render('contact');
});

//post route for submisstion
app.post('/send', (req, res) => {
   //creates an output string that'll be in the body of the email, which will include all fields because we need to know what the user put in
   const output = `
      <p>You have a new contact request<p/>
      <h3>Contact Details</h3>
      <ul>
         <li>Name: ${req.body.name}</li>
         <li>Company: ${req.body.company}</li>
         <li>Email: ${req.body.email}</li>
         <li>Phone #: ${req.body.phone}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
   `;

   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
      host: 'mail.webpoint360.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
         user: 'nabeel@webpoint360.com', // generated ethereal user
         pass: 'password' // real password goes here
      },
      tls:{
         rejectUnauthorized: false
      }
   });

   // setup email data with unicode symbols
   let mailOptions = {
      from: '"Nodemailer Contact" <nabeel@webpoint360.com>', // sender address
      to: 'nabeel@webpoint360.com, nabeelster25@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
   };

   // send mail with defined transport object
   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg: 'Email has been sent'});
   });
});

app.listen(process.env.PORT || 3000, () => console.log('server started'));