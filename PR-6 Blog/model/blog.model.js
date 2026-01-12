const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String
    },

    slug: {
        type: String
    },

    author: {
        type: String
    },

    email: {
        type: String
    },

    password: {
        type: String
    },

    shortDesc: {
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
        enum: ['publish', 'draft']
    },

    tags: [{
        type: String
    }],

    blogImage: {
        type: String
    },

    createdAt: {
        type: Date
    }
});

module.exports = mongoose.model('blogs', blogSchema);
