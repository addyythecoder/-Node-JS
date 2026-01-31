const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    status: {
        type: String,
        enum: ["publish", "draft"]
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date
    }
});

module.exports = mongoose.model("blog", blogSchema);
