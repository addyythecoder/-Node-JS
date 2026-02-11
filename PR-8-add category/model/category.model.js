const mongoose = require('mongoose');

const categoryschema = mongoose.Schema({
    categoryName: {
        type: String
    },
    categoryImage: {
        type: String
    }
})

module.exports = mongoose.model('category', categoryschema);