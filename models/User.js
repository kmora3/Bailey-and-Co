const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  userSchema = new mongoose.Schema({
    local: {
      email: {type: String, required: true},
      // username: String, //{type: String, required: true},
      // fName: String, //{type: String, required: true},
      // lName: String, //{type: String, required: true},
      password: {type: String, required: true},
      name: {type: String, required: true}
    },
    // reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
  })

// userSchema.pre('findOne', function() {
//   this.populate('reviews')
// })

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema)
