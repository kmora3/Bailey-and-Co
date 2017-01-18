const
  express = require('express'),
  passport = require('passport'),
  userRouter = express.Router(),
  User = require('../models/User.js')

userRouter.route('/login')
  .get((req,res) => {
    res.json({message: "This is the login page"})
  })
  // post request for actually logging in

userRouter.route('/signup')
  .get((req,res) => {
    res.json({message: "This is the signup page"})
  })
  // post request for actually signing up

userRouter.get('/profile', (req,res) => {
  res.json({message: "This is a users profile page"})
})

// logout action and route
// userRouter.get('/logout', (req, res) => {
//   req.logout()
//   res.redirect('/')
// })

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  req.flash('loginMessage', 'You must be logged in to see that.')
  res.redirect('/login')
}

module.exports = userRouter
