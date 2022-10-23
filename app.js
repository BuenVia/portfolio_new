const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require('method-override')
require("dotenv").config();

const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
const pageRouter = require("./routes/pageRouter");
const blogRouter = require('./routes/blogRouter')
const apiRouter = require("./routes/apiRouter");

mongoose.connect(process.env.MONGO_DB);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride('_method'))

// Pages //
app.get("/", pageRouter);
app.get("/blog", pageRouter);
app.get("/blog/:slug", pageRouter);
// app.get("/blog/:article", pageRouter);
// app.get('/post', pageRouter)
// app.post('/post', pageRouter)

// Blog
app.get('/admin', blogRouter)
app.post('/admin', blogRouter)
app.get('/admin/new', blogRouter)
app.get('/admin/:slug', blogRouter)
app.get('/admin/edit/:id', blogRouter)
app.put('/admin/:id', blogRouter)

// API //
// Blog
app.get("/api/blog", apiRouter);
app.post("/api/blog", apiRouter);

app.listen(port, (req, res) => {
  console.log(`App is listening on port: ${port}`);
});
