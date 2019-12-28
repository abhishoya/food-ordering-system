var express = require('express');
var loginRouter = express.Router();
const Admin = require("../models/adminModel");
var bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const keys = require("../config");
/* GET users listing. */
loginRouter.post('/signup', function(req, res, next) {
  console.log(req.body);
  Admin.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.email = "User already exists";
      return res.status(400).json(errors);
    } else {
      const newAdmin = new Admin({
        username: req.body.username,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  })
});

loginRouter.post("/login", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  console.log(username,password);
  Admin.findOne({ username }).then(user => {
    if (!user) {
      const errors = new Error;
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user._id, name: user.username };
        console.log(keys);
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            console.log(token);
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = loginRouter;
