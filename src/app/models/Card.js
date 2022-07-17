const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Card = new Schema({
    user_id: {type: 'string', required: true},
    card: {type: Array, required:true }
},
{
    timestamps: true
}
)

module.exports = new mongoose.model('card', Card);
