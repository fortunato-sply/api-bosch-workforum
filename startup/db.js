const mongoose = require('mongoose');
const config = require('../config/default.json');

module.exports = function(){
    const db = config.db;
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`connected to ${db}`));
}