const express = require("express");
const router = express.Router();
// const Article = require("../models/blogSchema");
const Blog = require('../models/blogSchema')

const projects = require("../public/js/projects");

////////// PAGES ///////////
router.get("/", (req, res) => {
  Blog.find({}, (err, foundResult) => {
    if (!err) {
      res.render("home", {
        projects: projects,
        blogPosts: foundResult
      });
    } else {
      res.send(err);
    }
  })
    .sort({ createdAt: 'desc' })
    .limit(3);
});

router.get("/blog", async (req, res) => {
  const blog = await Blog.find().sort({ createdAt: 'desc' });
  res.render('blog', { posts: blog })
});

router.get('/blog/:slug', async (req, res) => {
    const blog = await Blog.findOne({ slug: req.params.slug })
  if (blog == null) res.redirect('/')
  res.render('post', { article: blog })
})


module.exports = router;
