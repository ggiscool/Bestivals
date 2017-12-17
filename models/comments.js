const mongoose = require("mongoose");
const commentsSchema = mongoose.Schema({
  submittedBy: {type: String, required: true},
  content: {type: String, required: true},
  fest: {type: mongoose.Schema.Types.ObjectId, ref: "Bestivals", required: true}
});

//EXPORTS
module.exports = mongoose.model("Comments", commentsSchema);
