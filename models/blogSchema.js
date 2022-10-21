const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  auth: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    require: true
  }
});

module.exports = mongoose.model("Article", blogSchema);
