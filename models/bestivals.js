const mongoose = require('mongoose');


const festivalsSchema = mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  //type: music, food, misc
  location: {type: String, required: true},
  dates: {type: String, required: true},
  cost: {type: Number, required: true},
  submittedBy: {type: String, required: true},
  img: {type: String, required: true},
  // timestamp: {}

});

module.exports = mongoose.model('Festivals', festivalsSchema);
