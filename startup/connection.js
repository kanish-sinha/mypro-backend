const mongoose = require('mongoose');
let databaseurl = 'mongodb://localhost:27017/mypro'
module.exports = function() {
    mongoose.connect(databaseurl)
        .then(() => console.log('connected succesfully: ', databaseurl))
        .catch((err) => console.error('connection failed : ', err))
}