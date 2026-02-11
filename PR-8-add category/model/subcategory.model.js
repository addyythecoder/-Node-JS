const mongoose = require('mongoose')
const subcategorySchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subCategoryName: {
        type: String
    }
})

module.exports = mongoose.model('subcategory', subcategorySchema)