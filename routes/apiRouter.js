const express = require("express");
const router = express.Router();
const Article = require("../models/blogSchema");
const Project = require("../models/projectSchema");

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

//Projects//
router.get("/api/projects", (req, res) => {
  Project.find({}, (err, foundResult) => {
    if (!err) {
      res.send(foundResult);
    } else {
      res.send(err);
    }
  });
});

router.post("/api/projects", (req, res) => {
  const newProject = new Project({
    title: req.body.title,
    content: req.body.content,
    site: req.body.site,
    gitHub: req.body.gitHub
  });
  newProject.save((err) => {
    if (!err) {
      res.send(`New Project has been successully saved:\n${newProject}`);
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
