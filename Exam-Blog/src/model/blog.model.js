const mongoose = require('mongoose')

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            
        },

        description: {
            type: String,
            
        },

        blogImage: {
            type: String
        },

        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'admin',
        }

    },
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model('blog', blogSchema)
