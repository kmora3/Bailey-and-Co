const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  methodOverride = require('method-override'),
  passport = require('passport'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  flash = require('connect-flash'),
  ejsLayouts = require('express-ejs-layouts'),
  ejs = require('ejs'),
  dotenv = require('dotenv').load({silent: true}),
  session = require('express-session'),
  MongoDBStore = require('connect-mongodb-session')(session)

const
  mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/bailey-and-co'

mongoose.connect(mongoConnectionString, (err) => {
  console.log(err|| "Connected to MongoDB(bailey-and-co)")
})

const store = new MongoDBStore({
  uri: mongoConnectionString,
  collection: 'sessions'
});

// middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// currentUser:
app.use((req, res, next) => {
	app.locals.currentUser = req.user
	app.locals.loggedIn = !!req.user

	next()
})

// ejs config
app.set('view engine', 'ejs')
app.use(ejsLayouts)


app.get('/', (req,res) => {
  res.json({message: "This is the homepage"})
})

// server
app.listen(3000, (err) => {
  console.log(err||"Server listening on PORT: 3000")
})
