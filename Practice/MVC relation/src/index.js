const express =require('express');

// ----

const User = require("./models/user.model.js");
const Post = require("./models/post.model.js");
const Comment = require("./models/comment.model.js");

// -----------

const usersController = require("./controllers/user.controller");
const postsController = require("./controllers/post.controller");
const commentsController = require("./controllers/comment.controller");

const app = express();

app.use(express.json()); //middleware to convert json into express

app.use("/users",usersController);
app.use("/posts",postsController);
app.use("/comments",commentsController);

module.exports = app ;
