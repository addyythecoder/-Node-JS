const mongoose = require('mongoose');

const dbConnect = () =>{
      mongoose.connect('mongodb+srv://addythecoder:%40Damnflame77@cluster0.umcwng9.mongodb.net/blo')
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err))
}

module.exports = dbConnect;