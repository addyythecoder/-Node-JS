const mongoose = require('mongoose')

const productschema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    },
    extrasubcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'extrasubcategory'
    },
    productName: {
        type: String
    },
    productDes: {
        type: String
    },
    ProductBrand: {
        type: String
    },
    productImage: {
        type: String
    },
    productPrice: {
        type: Number
    }

})

module.exports = mongoose.model('product', productschema);