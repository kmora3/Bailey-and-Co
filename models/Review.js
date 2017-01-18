const
  mongoose = require('mongoose'),
  commentSchema = new mongoose.Schema({
    body: {type: String}
  }),
  reviewSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    rating: {type: Number, default: null},
    comments: [commentSchema],
    _author: {type: mongoose.Schema.Type.ObjectId, ref: 'User'}
  }, {timestamps: true})

  reviewSchema.pre('findOne', function() {
    this.populate('_author')
  })

module.exports = mongoose.model('Review', reviewSchema)
