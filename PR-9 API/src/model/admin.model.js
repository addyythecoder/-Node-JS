const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    adminName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    adminImage: {
        type: String
    },
    role: {
        type: String,
        default: 'Admin'
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    isDelete: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Admin', adminSchema);