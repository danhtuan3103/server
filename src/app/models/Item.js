const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
    title: {type: 'string', required: true},
    description: {type: 'string', required: true},
    images: {type: Array, required: true},
    sex : {type: 'string', required: true},
    type : {type: 'string', required: true},
    colors : {type: Array, required: true},
    price : {type: 'number', required: true},
    sizes : {type: Array, required: true},
    item_code : {type: 'string'},
},
{
    timestamps: true
}
)

module.exports = new mongoose.model('Item', Item);
