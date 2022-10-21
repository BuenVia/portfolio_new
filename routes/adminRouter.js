const express = require('express')
const router = express.Router()
const Article = require('../models/blogSchema')
const Project = require('../models/projectSchema')

//ADMIN//
router.get('/admin', (req, res) => {
    res.render('admin/index')
})

router.get('/admin/edit-project', (req, res) => {
    Project.find({}, (err, foundResults) => {
        if(!err) {
            res.render('admin/edit-project', { projects: foundResults })
        }
    })
})

router.get('/admin/edit-project/:id', (req, res) => {
    const projectId = req.params.id
    Project.findOne({ _id: projectId }, (err, foundResult) => {
        if(!err) {
            res.render('admin/edit-project-form', { project: foundResult})
        } else {
            res.send(err)
        }
    })
})

router.post('/admin/edit-project/', (req, res) => {
    const projectId = req.body.id
    const updateProject = {
        title: req.body.title,
        content: req.body.content,
        site: req.body.site,
        gitHub: req.body.gitHub,
        img: req.body.img
    }
    Project.updateOne({ _id: projectId }, {$set: updateProject}, (err) => {
        if(!err) {
            res.redirect('/admin?success=true')
        } else {
            res.send(err);
        }
    })
})

router.get('/admin/edit-blog', (req, res) => {
    Article.find({}, (err, foundResults) => {
        if(!err) {
            res.render('admin/edit-blog', { blogs: foundResults })
        }
    })
})

router.get('/admin/edit-blog/:id', (req, res) => {
    const blogId = req.params.id
    Article.findOne({_id: blogId}, (err, foundResult) => {
        if(!err) {
            res.render('admin/edit-blog-form', { blog: foundResult })
        }
    })
})

router.post('/admin/edit-blog', (req, res) => {
    const blogId = req.body.id
    const updateBlog = {
        title: req.body.title,
        auth: req.body.auth,
        content: req.body.content
    }
    Article.updateOne({ _id: blogId }, {$set: updateBlog },(err) => {
        if (!err) {
            res.redirect('/admin?update=blog&success=true')
        } else {
            res.redirect('/admin?update=blog%success=false')
            console.error(err);
        }
    })
})

module.exports = router