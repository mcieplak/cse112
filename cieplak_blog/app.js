/******************************************************************************
* Name: Michael Cieplak
* PID: A11445234
* Class: CSE112
* Description: This is a rest API which maintains a websites blog. This API is
* able to create, read, update, and delete blog posts and comments.
******************************************************************************/
// requirements used by this app
var express = require('express');
var path = require('path');
var connect = require('connect');
var mongoose = require('mongoose');
var app = express();

// connect to local database
mongoose.connect("mongodb://localhost/cieplak_blog");
var db = mongoose.connection;

// check state of connection
// will return: 0 for not connected
//              1 for connected
//              2 for connecting
console.log(mongoose.connection.readyState);
var collection = db.collection('cieplak_blog');

// use the body parser to be able to filter JSON objects
app.use(connect.bodyParser());

/******************************************************************************
* /postBlogPost: Will insert a new blog post into the database.
* Input: The blog post along with additional information such as user and
*        title.
* Output: Will return the object just inserted into the database.
******************************************************************************/
app.post('/postBlogPost', function(req, res) {
  // create the query for the database
  var query = {title: req.body.title, user : req.body.user,
               post: req.body.blogPost, comments: ""};
  
  // execute the query
  collection.insert(query, {w:1}, function(err, records) {
    // check if any errors occurred
    if(err) {
      console.log("Could not enter information into the database.");
    }
    else {
      console.log("Inserted the following into the database:\n");
      console.log("title: " + req.body.title + "\nblogPost: " + req.body.blogPost);
      res.json(query);
    }
  });
});

app.get('/getBlog', function(req, res) {
  collection.find().toArray(function(err, records) {
    console.log(records);
    res.send(records);
  });
});

module.exports = app;
