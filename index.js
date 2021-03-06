const express=require("express");
const mongoose=require("mongoose");
const passport=require("passport");
const path=require("path");
require("dotenv").config();
const app = express();
bodyParser = require("body-parser");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./app/routes/routes.js')(app);
const localstrategy=require('passport-local').Strategy;
const session =require('express-session');
const User = require("./app/models/User");
const bcrypt = require('bcrypt');


const user=require("./app/controllers/user");
const poi=require("./app/controllers/pointOfInterest");
const { PORT} = process.env;
const db=require("./config/configdb.js");

mongoose.connect(db.url, { useNewUrlParser: true },  {autoIndex: false});
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
  );
  process.exit();
});

var user_name="";

//middlewares
app.use(session({
    secret: "secret",
    resave:false,
    saveUninitialized: true
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//we set middleware related with passport
app.use(passport.initialize());
app.use(passport.session());

//to add the user detail in the session
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//to read the user detail in the session
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    })
});

//here we will define the local strategy for authentication
passport.use(new localstrategy(
    function(username, password, done) {
      user_name=username;
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        bcrypt.compare(password, user.password, function(err, res){
            if (err) return done(err);
            if (res===false) return done(null, false);
            return done(null, user);
        });
       
      });
    }
  ));

function isLoggedIn(req, res, next)
{
    if (req.isAuthenticated()) return next();
    res.redirect('/login-user');
}

function isLoggedOut(req, res, next)
{
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
}

app.get("/login-user", isLoggedOut, (req, res) =>{
      res.render("login-user", {errors: {}});
     });


app.get('/', isLoggedIn, (req, res)=>{
    res.render('index', {user_name});
});


app.post('/login-user', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login-user'
}));


app.get('/register-user', (req, res)=>{
    res.render('register-user', {errors: {}});
});


app.get("/logout", (req, res)=>{
    req.logout();
    res.redirect('/');
});

app.post('/register-user', user.registerUser, (req, res)=>{
    res.render('login-user');
});  


app.post('/register', isLoggedIn, (req, res)=>{
    res.render('register');
});


app.get('/create-poi', isLoggedIn, (req, res)=>{
    res.render('create-poi', {lon: null, lat: null, errors:{}});
});

app.get('/create-poi-map/:lon/:lat', isLoggedIn, (req, res)=>{
    res.render('create-poi', {lon: req.params.lon, lat: req.params.lat, errors:{}});
});


app.get('/create-review', isLoggedIn, (req, res)=>{
    res.render('review', {reviews: reviews});
});


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });