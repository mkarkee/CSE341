/*******************************************************************************
 * Feel free to remove this comment block and all other comments after pulling. 
 * They're for information purposes only.
 * 
 * This layout is provided to you for an easy and quick setup to either pull
 * or use to correct yours after working at least 1 hour on Team Activity 02.
 * Throughout the course, we'll be using Express.js for our view engines.
 * However, feel free to use pug or handlebars ('with extension hbs'). You will
 * need to make sure you install them beforehand according to the reading from
 * Udemy course. 
 * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
// Our initial setup (package requires, port number setup)
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const User = require("./model/user");
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://testUser:appleball@cluster0.lrjnz.mongodb.net/shop';
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const routes = require('./routes');
const { userInfo } = require('os');


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store}));

// app.use((req, res, next) => {
//   User.findById('60ac0db83fda4665283c311d')
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err=> console.log(err)); 
// });

app.use(bodyParser({extended: false})); // For parsing the body of a POST


app.use('/', routes);


mongoose.connect(MONGODB_URI)
        .then(result => {
          app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
        })
        .catch(err => {
          console.log(err);
        });


