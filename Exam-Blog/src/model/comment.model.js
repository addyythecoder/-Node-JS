const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
{
    comment: {
        type: String,
        
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog',
        
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        
    }

},
{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('comment', commentSchema)
