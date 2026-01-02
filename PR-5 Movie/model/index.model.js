const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    genre: {
        type: String
    },
    year: {
        type: Number
    },
    rating: {
        type: Number
    },
    description: {
        type: String
    },
    ProfileImage:{
        type:String
    }
   
})

module.exports = mongoose.model('movie', movieSchema);