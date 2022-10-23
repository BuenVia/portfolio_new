const express = require("express");
const router = express.Router();
const Article = require("../models/blogSchema");

////////// API ///////////
//Blog//
router.get("/api/blog", (req, res) => {
  Article.find({}, (err, foundResults) => {
    if (!err) {
      res.send(foundResults);
    } else {
      res.send(err);
    }
  });
});

router.post("/api/blog", (req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
    auth: req.body.auth,
    date: new Date()
  });
  newArticle.save((err) => {
    if (!err) {
      res.send(`Article sent\n ${newArticle}`);
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
