// RUN ME:
// node server

var express = require('express');
var app = express();
var mongojs = require('mongojs');
// npm install mongojs
var db = mongojs('typespeed', ['typespeed']);
// npm install body-parser
// Required for parsing the body of a request object
var bodyParser = require('body-parser');

// Look for static file
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Test the root route
// app.get('/', function(req, res) {
//   res.send("hello from server.js");
// });

app.get('/typespeed', function(req, res) {
  // This should appear in Terminal
  console.log("I received a get request");

  // Remember to run MongoJS in order to retrieve the DB data!
  // Same thing happens in rails: Postgres has to be running while Rails app is running
  db.typespeed.find(function(err,docs) {
    console.log(docs);
    res.json(docs);
  });
}); // End GET controller

app.post('/typespeed', function(req,res) {
  // NEED TO INSTALL LIBRARY:
  // npm install body-parser
  console.log("I received this request: " +req.body);

  // This is the MongoDB query command
  db.typespeed.insert(req.body, function(err, doc) {
    res.json(doc);
  }); // End DB query

}); // End POST controller

app.listen(3000);
console.log("Server running on port 3000");