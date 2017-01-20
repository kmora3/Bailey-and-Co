const
  express = require('express'),
  passport = require('passport'),
  userRouter = express.Router(),
  yelp = require('../factories/yelp.js'),
  yelpLocation = require('../factories/yelpLocation.js'),
  User = require('../models/User.js'),
  userController = require('../controllers/users.js')

userRouter.route('/')
  .get(userController.search)

userRouter.route('/location/:id')
  .get(userController.singleSearch)

userRouter.route('/login')
  .get(userController.login)
  .post(userController.localLogin)

userRouter.route('/signup')
  .get(userController.signup)
  .post(userController.localSignup)

userRouter.route('/profile')
  .get(userController.profile)

userRouter.route('/logout')
  .get(userController.logout)

userRouter.route('/results')
  .get(userController.results)

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  req.flash('loginMessage', 'You must be logged in to see that.')
  res.redirect('/login')
}

module.exports = userRouter
