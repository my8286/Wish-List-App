const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const WishSchema = Schema({
    wish:String
})

//module.exports = mongoose.model('Wishes',WishSchema);  or

mongoose.model('Wishes',WishSchema);