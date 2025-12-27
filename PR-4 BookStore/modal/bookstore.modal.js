const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    Booktitle:String,
    Authorname:{
        type:String
    },
    Desc:{
        type:String
    },
    Image:{
        type:String
    },
    Language:{
        type:String
    },
    Price:{
      type:Number
    }
})

module.exports = mongoose.model('bookStore',bookSchema);