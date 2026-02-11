const mongoose = require('mongoose')

const cartschema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('cart', cartschema)