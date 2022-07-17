const mongoose = require('mongoose');
require('dotenv').config()

async function connect() {
    mongoose.connect( process.env.DB_URL,{
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));
}

module.exports = { connect }