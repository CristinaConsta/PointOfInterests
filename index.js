const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
require("dotenv").config();
const app = express();
bodyParser = require("body-parser");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const auth = require('./app/middleware/auth.js');
require('./app/routes/routes.js')(app);

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


app.get('/', auth.isLoggedIn, (req, res)=>{
  res.render('index', {user_name});
});


app.get('/register-user', (req, res)=>{
    res.render('register-user');
    });    

app.get('/login-user', auth.isLoggedOut, (req, res)=>{
      res.render('login-user');
});
  
// app.post('/login-user', passport.authenticate('local',{
//   successRedirect: '/',
//   failureRedirect: '/login-user'
// }));

app.get('/register-user', (req, res)=>{
  res.render('register-user');
});

app.get("/logout", (req, res)=>{
  req.logout();
  res.redirect('/');
});

// app.post('/register', async (req, res)=>{
//   try{
//       const new_pass= await bcrypt.hash(req.body.password, 10);
//       var new_user=new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: new_pass
//   });
//   new_user.save((err, result)=>{
//       if (err) return console.log(err);
//   });
//   res.redirect('/login');
// }
// catch(err) {res.redirect('/register');};
// });

// app.post('/register', isLoggedIn, (req, res)=>{
//   res.render('register');
// });
    
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });