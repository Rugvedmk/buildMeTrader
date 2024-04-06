const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/trading");

const rulesSchema = new mongoose.Schema({
  name: String,
  description: String,
  userID: String,
});

module.exports = mongoose.model("rules", rulesSchema);
