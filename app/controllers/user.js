const { response } = require("express");
const User = require("../models/User");
const bcrypt = require('bcrypt');

//create user

exports.registerUser = async (req, res) => {
  let newUser = await User.findOne({ username: req.body.username });
  if (newUser) {
    res.render("register-user", { errors: { username: { message: 'The name already used' } } })
    return
  } else {
    newUser = new User({ username: req.body.username, password: req.body.password });
    if(!req.body.username){
    res.render("register-user", { errors: {username: {message: "Username is required"}}})
    return
  }else if(!req.body.password){
        res.render("register-user", { errors: {password: {message: "Password is required"}}})
        return
    }else{
    await newUser.save();
    res.redirect("/login-user");
  }
  }
  };

  exports.save = async (req, res) => {
    await User.insertOne(req.body)
    return
  };

// login (retrieve) user

// exports.login = async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username});
//     console.log(user);
//   if (!user) {
//     res.render("login-user", { errors: { username: { message: 'username not found' } } })
//     return
//   }
//     const match = await bcrypt.compare(req.body.passwordLogin, user.password);
//     if (match) {
//       req.session.userID=user._id;
//       res.redirect("/");
//       return
//     }
//       res.render("login-user", { errors: { password: { message: 'password does not match' } } })
//     } catch (e) {
//     return res.status(400).send({message: JSON.parse(e)});
//   }
// }

