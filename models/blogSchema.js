const mongoose = require("mongoose");
const marked = require('marked')
const creatDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = creatDomPurify(new JSDOM().window)


const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  auth: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    require: true
  }
});


module.exports = mongoose.model("Article", blogSchema);
