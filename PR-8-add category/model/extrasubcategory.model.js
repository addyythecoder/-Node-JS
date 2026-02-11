const mongoose = require('mongoose')
const extrasubcategoryschema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    },
    extrasubCategoryName: {
        type: String
    }

})

module.exports = mongoose.model('extrasubcategory', extrasubcategoryschema)