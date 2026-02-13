const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    name: {
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
    mobileNo: {
        type: Number
    },
    role: {
        type: String,
        default: "user",
    },
    uprofileImage: {
        type: String
    }

},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model('user', userschema)