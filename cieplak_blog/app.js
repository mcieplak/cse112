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
var mongo = require('mongodb');
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
               post: req.body.blogPost};
  
  // execute the query
  collection.insert(query, {w:1}, function(err, records) {
    // check if any errors occurred
    if(err) {
      console.log("Could not enter information into the database.");
    }
    else {
      console.log("Inserted the following into the database:\n");
     // console.log("title: " + req.body.title + "\nblogPost: " + req.body.blogPost);
      res.json(query);
    }
  });
});

/******************************************************************************
* /getAllBlog: Will find and return all blog posts inside of the database.
* Input: None. 
* Output: Will return the blogs in the database.
******************************************************************************/
app.get('/getAllBlogs', function(req, res) {
  collection.find().toArray(function(err, records) {
    console.log(records);
    res.send(records);
  });
});

/******************************************************************************
* /getBlog: Will find and return a specific blog post.
* Input: The ID associated with the blog post. 
* Output: Will return the blog in the database.
******************************************************************************/
app.put('/getBlog', function(req, res) {
  var BSON = mongo.BSONPure;
  var o_id = new BSON.ObjectID(req.body.id);
  var query = {_id : o_id};

 // execute the query
  collection.find(query).toArray(function(err, records) {
    // check if any errors occurred
    if(err) {
      console.log("Could not find the information into the database.");
    }
    else {
     // console.log("Inserted the following into the database:\n");
      //console.log("title: " + req.body.title + "\nblogPost: " + req.body.blogPost);
      console.log(records);
      res.json(records);
    }
  });
});


/******************************************************************************
* /deleteBlog: Delete a blog post.
* Input: The ID associated with the blog post. 
* Output: None.
******************************************************************************/
app.put('/deleteBlog', function(req, res) {
  var BSON = mongo.BSONPure;
  var o_id = new BSON.ObjectID(req.body.id);
  var query = {_id : o_id};

 // execute the query
  collection.remove(query, function(err, records) {
    // check if any errors occurred
    if(err) {
      console.log("Could not find the information into the database.");
    }
    else {
     // console.log("Inserted the following into the database:\n");
      //console.log("title: " + req.body.title + "\nblogPost: " + req.body.blogPost);
      console.log(records);
      res.json(records);
    }
  });
});

/******************************************************************************
* /updateBlog: Will update a blog post in the database.
* Input: The blog post ID along with the new nlog post.
* Output: Will return the object just inserted into the database.
******************************************************************************/
app.post('/updateBlog', function(req, res) {
  var BSON = mongo.BSONPure;
  var o_id = new BSON.ObjectID(req.body.id);
  var query = {_id : o_id};


  // execute the query
  collection.update(query, {$set:{post:req.body.blogPost}}, function(err, records) {
    // check if any errors occurred
    if(err) {
      console.log("Could not enter information into the database.");
    }
    else {
      console.log("Inserted the following into the database:\n");
     // console.log("title: " + req.body.title + "\nblogPost: " + req.body.blogPost);
      res.json(query);
    }
  });
});


/******************************************************************************
* /postComment: Will insert a new comment under a blog post into the database.
* Input: The blog post ID along with the comment.
* Output: Will return the object just inserted into the database.
******************************************************************************/
app.post('/postComment', function(req, res) {
  // create the query for the database
  var query = {id: req.body.id, comment : req.body.comment};
  
  // execute the query
  collection.insert(query, {w:1}, function(err, records) {
    // check if any errors occurred
    if(err) {
      console.log("Could not enter information into the database.");
    }
    else {
      console.log("Inserted the following into the database:\n");
     // console.log("title: " + req.body.title + "\nblogPost: " + req.body.blogPost);
      res.json(query);
    }
  });
});


/******************************************************************************
* /readComments: Will read comments under a blog post in the database.
* Input: The blog post ID.
* Output: Will return the comments for the blog post.
******************************************************************************/
app.put('/readComments', function(req, res) {
  // create the query for the database
  var query = {id: req.body.id};

  console.log(req.body.id);
  // execute the query
  collection.find(query).toArray(function(err, records) {
    // check if any errors occurred
    if(err) {
      console.log("Could not find the information into the database.");
    }
    else {
      console.log(records);
      res.json(records);
    }
  });
  
});

/******************************************************************************
* /deleteComment: Delete a comment associated with a  post.
* Input: The ID associated with the comment. 
* Output: None.
******************************************************************************/
app.put('/deleteComment', function(req, res) {
  var BSON = mongo.BSONPure;
  var o_id = new BSON.ObjectID(req.body.id);
  var query = {_id : o_id};

 // execute the query
  collection.remove(query, function(err, records) {
    // check if any errors occurred
    if(err) {
      console.log("Could not find the information into the database.");
    }
    else {
     // console.log("Inserted the following into the database:\n");
      //console.log("title: " + req.body.title + "\nblogPost: " + req.body.blogPost);
      console.log(records);
      res.json(records);
    }
  });

});

/******************************************************************************
* /updateComment: Will update a comment in the database.
* Input: The blog post ID along with the new comment.
* Output: Will return the object just inserted into the database.
******************************************************************************/
app.post('/updateComment', function(req, res) {
  // create the query for the database
  //var query = {id: req.body.id, user : req.body.comment};
  
  var BSON = mongo.BSONPure;
  var o_id = new BSON.ObjectID(req.body.id);
  var query = {_id : o_id};


  // execute the query
  collection.update(query, {$set:{comment:req.body.comment}}, function(err, records) {
    // check if any errors occurred
    if(err) {
      console.log("Could not enter information into the database.");
    }
    else {
      console.log("Inserted the following into the database:\n");
     // console.log("title: " + req.body.title + "\nblogPost: " + req.body.blogPost);
      res.json(query);
    }
  });
});


// not sure what this does but it breaks the app if i remove it
module.exports = app;
