const mongoose = require('mongoose');


const bestivalsSchema = mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  //type: music, food, misc
  location: {type: String, required: true},
  dates: {type: Number, required: true},
  cost: {type: Number, required: true},
  img: {type: String, required: true}
  submittedBy: {type: String, required: true},
  timestamp: {}

});

module.exports = mongoose.model('Bestivals', bestivalsSchema);
