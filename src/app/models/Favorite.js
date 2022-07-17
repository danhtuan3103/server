const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Favorite = new Schema({
    user_id: {type: 'string', required: true},
    items: {type: Array, required:true }
},
{
    timestamps: true
}
)

module.exports = new mongoose.model('favorite', Favorite);