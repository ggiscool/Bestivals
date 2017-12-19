//DEPENDENCIES
const mongoose = require('mongoose');

//FESTIVALS SCHEMA
const festivalSchema = mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  location: {type: String, required: true},
  dates: {type: String, required: true},
  cost: {type: String, required: true},
  submittedBy: {type: String, required: true},
  img: {type: String, required: true},
},
{ timestamps: { createdAt: 'created_at' } }
);

//----------------------------------------------------
//EXPORTS
module.exports = mongoose.model('Festival', festivalSchema);
