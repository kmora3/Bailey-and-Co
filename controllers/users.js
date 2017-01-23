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
  singleSearch,
  newReview,
  edit,
  editProfile,
  destroy
}

function edit(req,res){
  res.render('users/edit')
}

function editProfile(req,res){
  User.findById(req.user._id, (err,user) => {
    console.log("user local before:")
    console.log(user.local)
    user.local = Object.assign({}, user.local, req.body)
    console.log("user local after:")
    console.log(user.local)
    user.save((err, user) => {
      if (err) throw err
      console.log("Updated user:")
      console.log(user);
      res.redirect('/profile')
    })
  })
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

function newReview(req,res){
  var newReview = new Review(req.body)
  newReview.yelp_id = req.params.id
  newReview._author = req.user
  newReview.save((err,review) => {
    if(err) return console.log(err)
    console.log(review[0])
    res.redirect('/location/' + req.params.id)
  })
}

function destroy(req,res){
  console.log("User being deleted")
  console.log(req.user._id)
  User.findByIdAndRemove(req.user._id, (err) => {
    if (err) throw err
    res.redirect('/')
  })
}
