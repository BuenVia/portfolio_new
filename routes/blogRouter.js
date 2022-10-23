const express = require('express')
const router = express.Router()
const Blog = require('../models/blogSchema')

router.get('/admin', async (req, res) => {
    const blog = await Blog.find().sort({ createdAt: 'desc' })
    res.render('admin/index', { articles: blog })
})
  
router.get('/admin/new', (req, res) => {
    res.render('admin/new', { article: new Blog() })
})

router.get('/admin/edit/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.render('admin/edit', { article: blog })
  })

router.get('/admin/:slug', async (req, res) => {
    const blog = await Blog.findOne({ slug: req.params.slug })
    if (blog == null) res.redirect('/')
    res.render('admin/show', { article: blog })
})

router.post('/admin', async (req, res, next) => {
    req.blog = new Blog()
    next()
}, saveArticle(''))

router.put('/admin/:id', async (req, res, next) => {
    req.blog = await Blog.findById(req.params.id)
    next()
  }, saveArticle('edit'))

  function saveArticle(path) {
    return async (req, res) => {
        let blog = req.blog
        blog.title = req.body.title
        blog.auth = req.body.auth
        blog.markdown = req.body.markdown
        try {
            blog = await blog.save()
            res.redirect(`/admin`)
          } catch (e) {
            res.render(`/admin`, { article: blog })
          }
    }
  }

module.exports = router