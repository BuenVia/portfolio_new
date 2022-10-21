const express = require("express");
const router = express.Router();
const Article = require("../models/blogSchema");
const Project = require("../models/projectSchema");

const projects = require("../public/js/projects");

////////// PAGES ///////////
router.get("/", (req, res) => {
  Article.find({}, (err, foundResult) => {
    if (!err) {
      res.render("home", {
        projects: projects,
        blogPosts: foundResult
      });
    } else {
      res.send(err);
    }
  })
    .sort({ _id: -1 })
    .limit(3);
});

router.get("/blog", (req, res) => {
  Article.find({}, (err, foundResults) => {
    if (!err) {
      res.render("blog", { posts: foundResults });
    } else {
      res.send(err);
    }
  }).sort({ $natural: -1 });
});

router.get("/blog/:article", (req, res) => {
  const article = req.params.article;
  Article.findOne({ _id: article }, (err, foundResult) => {
    res.render("post", { art: foundResult });
  });
});

router.get("/blog/id", (req, res) => {
  res.render("test");
});

module.exports = router;
