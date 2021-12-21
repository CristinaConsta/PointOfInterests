const express=require("express");
const mongoose=require("mongoose");
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

const auth = require('./app/middleware/auth.js');
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


auth.auth();

//1
app.get("/login-user", auth.isLoggedOut, (req, res) =>{
  res.render("login-user", {errors: {}});
 });

//2
app.get('/', auth.isLoggedOut, auth.isLoggedIn, (req, res)=>{
  res.render('index', {user_name});
});

//3
app.post('/login-user', auth.authenticate);


//4
app.get('/register-user', (req, res)=>{
  res.render('register-user', {errors: {}});
});

//5
app.get("/logout", (req, res)=>{
  req.logout();
  res.redirect('/');
});

//6
app.post('/register-user', user.registerUser, (req, res)=>{
    res.render('login-user');
});    


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });