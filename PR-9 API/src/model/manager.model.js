const mongoose = require('mongoose');

const managerSchema = mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    managerName: {
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
    managerImage: {
        type: String
    },
    role: {
        type: String,
        default: 'manager'
    },
    department: {
        type: String
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

module.exports = mongoose.model('Manager', managerSchema);