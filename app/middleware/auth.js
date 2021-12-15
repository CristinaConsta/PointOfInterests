const passport=require("passport");
const bcrypt=require("bcrypt");
const express=require("express");
const app = express();
const path= require("path");
const localstrategy=require('passport-local').Strategy;
const session =require('express-session');

app.use(session({
  secret: "amjad",
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

var user_name="";

passport.use(new localstrategy(
    function(username, password, done) {
      user_name=username;
      User.findOne({ name: username }, function (err, user) {
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
    if (req.isAuthenticated) return next();
    res.redirect('/login-user');
}

function isLoggedOut(req, res, next)
{
    if (!req.isAuthenticated) return next();
    res.redirect('/');
}




app.get('/register-user', (req, res)=>{
    res.render('register-user');
    });    

app.get('/login-user', isLoggedOut, (req, res)=>{
      res.render('login-user');
});

module.exports={isLoggedIn, isLoggedOut};
