const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    site: {
        type: String,
        require: true
    },
    gitHub: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Project', projectSchema)