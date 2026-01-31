const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ["admin", "editor"]
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date
    }
});

module.exports = mongoose.model("admins", adminSchema);
