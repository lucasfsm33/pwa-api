const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Pedido = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  year:{
    type: Number
  }
  },{
    collection: 'pedido'
});

module.exports = mongoose.model('Pedido', Pedido);