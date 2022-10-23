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
    if (!err) {
      res.render("post", { art: foundResult });
    } else {
      res.redirect('/')
    }
  });
});

router.get("/post", (req, res) => {
  res.render("new-blog");
});

router.post("/post", (req, res) => {


  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
    auth: req.body.auth,
    date: new Date()
  });
  newArticle.save((err) => {
    if (!err) {
      res.redirect('/blog?success=true');
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
