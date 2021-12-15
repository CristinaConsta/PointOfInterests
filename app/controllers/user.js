const { response } = require("express");
const User = require("../models/User");
const bcrypt = require('bcrypt');

//create user

exports.registerUser = async (req, res) => {
  let newUser = await User.findOne({ email: req.body.email });
  if (newUser) {
    res.render("create-user", { errors: { email: { message: 'The email already used' } } })
    return
  } else {
    newUser = new User({ name: req.body.username, email: req.body.email, password: req.body.password });
    if(!req.body.username){
    res.render("create-user", { errors: {name: {message: "Username is required"}}})
    return
  }else if(!req.body.email){
      res.render("create-user", { errors: {email: {message: "Email is required"}}})
      return
    }else if(!req.body.password){
        res.render("create-user", { errors: {password: {message: "Password is required"}}})
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

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email});

  if (!user) {
    res.render("login-user", { errors: { email: { message: 'email not found' } } })
    return
  }
    const match = await bcrypt.compare(req.body.passwordLogin, user.password);
    if (match) {
      req.session.userID=user._id;
      res.redirect("/");
      return
    }
      res.render("login-user", { errors: { password: { message: 'password does not match' } } })
    } catch (e) {
    return res.status(400).send({message: JSON.parse(e)});
  }
}

// delete user
exports.delete = async (req, res) => {  
  const id = global.user;             
  try {
    await User.findByIdAndRemove(id);  
    res.redirect("/logout");            
  } catch (e) {                           
    res.status(404).send({                
      message: `could not delete  record ${id}.`, 
    });
  }
};