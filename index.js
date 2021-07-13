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

app.use((req, res, next) => {
  User.findById('60ac0db83fda4665283c311d')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err=> console.log(err)); 
});

app.use(bodyParser({extended: false})); // For parsing the body of a POST


app.use('/', routes);


mongoose.connect(MONGODB_URI)
        .then(result => {
          const server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
          const io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('Client connected!');

  socket
    .on('disconnect', () => {
      console.log('A client disconnected!');
    })
    .on('newUser', (username, time) => {
      // A new user logs in.
      const message = `${username} has logged on.`;
      // Tell other users someone has logged on.
      socket.broadcast.emit('newMessage', {
        message,
        time,
        from: 'admin',
      });
    })
    .on('message', (data) => {
      // Receive a new message
      console.log('Message received');
      console.log(data);
      // This one is simple. Just broadcast the data we received.
      // We can use { ...data } to copy the data object.
      socket.broadcast.emit('newMessage', {
        ...data,
      }); // Note, only emits to all OTHER clients, not sender.
    });
});
        })
        .catch(err => {
          console.log(err);
        });




