const mongoose = require("mongoose");
const commentsSchema = mongoose.Schema({
  submittedBy: {type: String, required: true},
  content: {type: String, required: true},
  fest: {type: mongoose.Schema.Types.ObjectId, ref: "Festivals", required: true}
},
{ timestamps: { createdAt: 'created_at' } }
);


//EXPORTS
module.exports = mongoose.model("Comments", commentsSchema);
