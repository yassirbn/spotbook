var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
var Spot = require("../models/Spot");

//SignUp Routes 
router.post('/signup', function(req, res) {
  console.log(req.body);
    if (!req.body.name || !req.body.password) {
      res.json({success: false, msg: 'Please pass username and password.'});
    } else {
      var newUser = new User({
        name: req.body.name,
        password: req.body.password
      });
      console.log(newUser);
      // save the user
      newUser.save(function(err) {
        if (err) {
          console.log(err);
          return res.json({success: false, msg: 'Username already exists.'});
        }
        res.json({success: true, msg: 'Successful created new user.'});
      });
    }
  });
  
//Login Routes 
  router.post('/signin', function(req, res) {
    User.findOne({
      name: req.body.name
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), config.secret);
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  });
  //New Spot 
  router.post('/spot' /*, passport.authenticate('jwt', { session: false}), */,function(req, res) {
   // var token = getToken(req.headers);
   // if (token) {
      console.log(req.body);
      var newSpot = new Spot({
        //isbn: req.body.isbn,
        name: req.body.name,
        description: req.body.description,
        adress: req.body.adress,
        //photo:req.body.photo
      });
  
      newSpot.save(function(err) {
        if (err) {
          console.log(err)
          return res.json({success: false, msg: 'Save spot failed.'});
        }
        res.json({success: true, msg: 'Successful created new spot.'});
      });
   // } else {
     // return res.status(403).send({success: false, msg: 'Unauthorized.'});
   // }
  });
  //router for getting list of Spots that accessible for authorized user
  router.get('/spot'/*, passport.authenticate('jwt', { session: false})*/, function(req, res) {
   // var token = getToken(req.headers);
   // if (token) {
      Spot.find(function (err, spots) {
        if (err) return next(err);
        res.json(spots);
      });
  //  } else {
   //   return res.status(403).send({success: false, msg: 'Unauthorized.'});
    //}
  });
  //get All User informations 
 
 
  router.post('/info',function(req,res){
    console.log(req.body.namel);
    namel=req.body.namel
    User.find({name:namel},function(err,users){
      if(err)return next(err);
      res.json(users)
      console.log(users);
     
      
    });
  })
//function for parse authorization token from request headers
getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
  //notifications 
  
   
  module.exports = router;