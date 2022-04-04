const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Rating = new Schema({
    user: { type: String, index: true },
    rating: { type: Number, index: true },
    song:{type:String,index: true }
  });


  module.exports = mongoose.model('Rating', Rating)   