const passport=require("passport");
const bcrypt=require("bcrypt");
const express=require("express");
const app = express();
const path= require("path");
const localstrategy=require('passport-local').Strategy;
const session =require('express-session');
const user=require("../controllers/user");

var user_name="";

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



const auth =  async (req, res, next) => {
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
        ))};

function isLoggedIn(req, res, next)
{
    if (req.isAuthenticated) return next();
    res.render('index', {user_name});
}

function isLoggedOut(req, res, next)
{
    if (!req.isAuthenticated) return next();
    res.redirect('/login-user');
}

const authenticate = async (req,res)=>
{ 
  passport.authenticate('local',
  {
    successRedirect: isLoggedIn(req,res),
    failureRedirect: '/login-user'
  });
};

// app.post('/login-user', passport.authenticate('local',{
//   successRedirect: '/',
//   failureRedirect: '/login-user'
// }));

// // app.get("/", isLoggedOut, isLoggedIn);

// app.post('/register-user', user.registerUser, (req, res)=>{
//     res.render('login-user');
//     });    

// app.get('/register-user', user.registerUser, (req, res)=>{
//       res.render('register-user');
//     });    

// app.get("/login-user", (req, res) =>{
//       res.render("login-user", {errors: {}});
//      });

// // app.post('/login-user', auth.auth);
  
// app.get('/register-user', (req, res)=>{
//   res.render('register-user', {errors: {}});
// });

// app.get("/logout", (req, res)=>{
//   req.logout();
//   res.redirect('/');
// });

module.exports={isLoggedIn, isLoggedOut, auth, authenticate};
