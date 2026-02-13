const mongoose = require('mongoose')

const dbconnect = () => {
    mongoose.connect('mongodb+srv://addythecoder:%40Damnflame77@cluster0.umcwng9.mongodb.net/blog')
        .then(() => console.log('DB is Connected !!!'))
        .catch((err) => console.log(err))
}

module.exports = dbconnect;