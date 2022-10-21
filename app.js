const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);
const pageRouter = require("./routes/pageRouter");
const adminRouter = require("./routes/adminRouter");
const apiRouter = require("./routes/apiRouter");

mongoose.connect(process.env.MONGO_DB);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

// Pages //
app.get("/", pageRouter);
app.get("/blog", pageRouter);
app.get("/blog/:article", pageRouter);

app.get("/admin", adminRouter);
app.get("/admin/edit-project", adminRouter);
app.get("/admin/edit-project/:id", adminRouter);
app.post("/admin/edit-project", adminRouter);
app.get("/admin/edit-blog", adminRouter);
app.get("/admin/edit-blog/:id", adminRouter);
app.post("/admin/edit-blog", adminRouter);

// API //
// Blog
app.get("/api/blog", apiRouter);
app.post("/api/blog", apiRouter);

// Projects
app.get("/api/projects", apiRouter);
app.post("/api/projects", apiRouter);

app.listen(port, (req, res) => {
  console.log(`App is listening on port: ${port}`);
});
