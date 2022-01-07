const mongoose = require('mongoose');
const config = require('config');
let databaseurl = config.get('database');
module.exports = function() {
    mongoose.connect(databaseurl)
        .then(() => console.log('connected succesfully: ', databaseurl))
        .catch((err) => console.error('connection failed : ', err))
}