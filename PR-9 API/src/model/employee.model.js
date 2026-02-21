const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    employeeName: {
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
        default: "Employee",
    },
    employeeImage: {
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

module.exports = mongoose.model('employee', employeeSchema)