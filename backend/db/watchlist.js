const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/trading");

const watchlistSchema = new mongoose.Schema({
  name: String,
  link: String,
  userID: String,
});

module.exports = mongoose.model("watchlist", watchlistSchema);
