const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  methodOverride = require('method-override'),
  passport = require('passport'),
  passportConfig = require('./config/passport.js'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  flash = require('connect-flash'),
  ejsLayouts = require('express-ejs-layouts'),
  ejs = require('ejs'),
  dotenv = require('dotenv').load({silent: true}),
  session = require('express-session'),
  MongoDBStore = require('connect-mongodb-session')(session),
  yelp = require('./factories/yelp.js'),
  yelpLocation = require('./factories/yelpLocation.js'),
  userRoutes = require('./routes/users.js'),
  Review = require('./models/Review.js')



  mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/bailey-and-co'

mongoose.connect(mongoConnectionString, (err) => {
  console.log(err|| "Connected to MongoDB(bailey-and-co)")

})

const store = new MongoDBStore({
  uri: mongoConnectionString,
  collection: 'sessions',
  collection: 'reviews'
});

// middleware
app.use(logger('dev'))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(flash())
app.use(session({
	secret: 'boooooooooom',
	cookie: {maxAge: 60000000},
	resave: true,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// currentUser:
app.use((req, res, next) => {
	app.locals.currentUser = req.user
	app.locals.loggedIn = !!req.user

	next()
})

// ejs config
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//Yelp-Api Search request


//Yelp-Api Single Business Lookup request



// app.post('/location/:id', (req, res) => {
//     Review.create(req.body, (err, review) => {
//       if(err) return console.log(err)
//       res.json(body)
//   })


//
// app.get('/restaurants/:id', (req, res) => {
//   yelpLocation.request_yelpLocation(':id', function(error, response, body){
//     res.json(JSON.parse(body))
//   })
// })

app.post('/location/:id', (req, res) => {
    var newReview = new Review()
    newReview.body = req.body.body
    newReview.rating = req.body.rating
    newReview.author = req.body.author

    newReview.save(function (err, review){
      if(err){
        res.send('Cant Save Review')
      }else{
        console.log(review)
        res.json(review)
            }
          })
      })


app.use('/', userRoutes)


// server
app.listen(3000, (err) => {
  console.log(err||"Server listening on PORT: 3000")
})
