const
  User = require('../models/User.js'),
  yelp = require('../factories/yelp.js'),
  yelpLocation = require('../factories/yelpLocation.js'),
  passport = require('passport'),
  passportConfig = require('../config/passport.js'),
  Review = require('../models/Review.js')


module.exports = {
  login,
  localLogin,
  signup,
  localSignup,
  profile,
  logout,
  results,
  search,
  singleSearch
}

function login(req,res){
  res.render('login')
}

function localLogin(){
  return passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  })
}

function signup(req,res){
  res.render('signup')
}

function localSignup(){
  return passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup'
  })
}

function profile(req,res){
  res.render('users/index')
}

function logout(req,res){
  req.logout()
  res.redirect('/')
}

function results(req,res){
  res.render('pages/search')
}

function search(req,res){
  if(req.query.terms || req.query.location) {
    yelp.search(req.query).then((body) => {
      res.render('pages/search', {businesses: body.businesses})
    })
  } else {
      res.render('pages/home', {businesses: []})
  }}

function singleSearch(req,res){
  if(req.params.id) {
    yelpLocation.search({id: req.params.id}).then((body) => {
      Review.find({yelp_id: req.params.id}, (err, reviews) => {
        if(err) return console.log(err)
        res.render('pages/location', {location: body, reviews})
      })

    })
  } else {
      res.render('pages/location', {location: []})
  }
}
