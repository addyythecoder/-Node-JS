const mongoose = require('mongoose')

const adminschema = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    hobbies: [{
        type: String
    }],
    mobileno: {
        type: String
    },
    profileImage: {
        type: String
    }
})
module.exports = mongoose.model('admin-seesion', adminschema)