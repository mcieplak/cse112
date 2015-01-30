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

var Schema = mongoose.Schema;
var stuff = new Schema ({
  title: String,
  post : String
});

app.use(connect.bodyParser());

app.post('/postBlogPost', function(req, res) {
  var query = {title: req.body.title, post: req.body.blogPost};
  
  collection.insert(query, {w:1}, function(err, records) {
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
