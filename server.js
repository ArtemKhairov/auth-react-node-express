const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const User = require("./models/User");
const withAuth = require('./middle');
// Секретка
const secret = "lacosta";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Подключение к монго
const mongo_uri = 'mongodb://localhost/react-auth';

app.use(express.static(path.join(__dirname, 'build')));

mongoose.connect(mongo_uri, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.get('/api/home', function (req, res) {
  res.send('welcome');
  console.log("Ты на странице /api/home")
});

app.get('/api/secret', withAuth,function (req, res) {
  res.send('The password is potato');
  console.log("Ты на странице /api/secret");
});

app.get('/ping', function (req, res) {
  return res.send('pong');
  
});

app.post('/api/register', function (req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function (err) {
    if (err) {
      res.status(500)
        .send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club buddy")
    }
  });
});

app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true })
            .sendStatus(200);
        }
      });
    }
  });
});

app.get('/checkToken', withAuth, function (req, res) {
  res.sendStatus(200);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Вас ожидает сервер")
});

