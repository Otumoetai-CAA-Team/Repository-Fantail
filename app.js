const http = require('http');
const mysql = require('mysql');
const express = require('express');
var fs = require('fs');
var path = require('path');

var MongoClient = require('mongodb').MongoClient;
const { table } = require('console');

//const uri = process.env.MONGODB_URI;
const uri = process.env.MONGODB_URI || "mongodb+srv://fyeard1449:hcGBE6g5i7ZhuodU@clusterm.zscdl.mongodb.net/test";

// Declaring the express to bind the variable app to the library
const app = express();

// __dirname finds the relative path variable
app.use(express.static(path.join(__dirname, '/')));

// Preparing the link between the js and ejs files
app.set('view engine', 'ejs')


table_names = []
track_names = []

// Setting up connection for the mongo database using the connection string (uri) 
MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, db) {
    // If an error exists 'throw' -- ie print -- error
    if (err) throw err;

    // Declares 'database' to hold the information of the writing_db, a database in our mongodb collections
    var database = db.db("writing_db");

    // Querying for a datapoint with the type writing, and its track being track 1
    var query = { "type": 'writing', "track": "track 1"};
    database.collection("writing_cl").find(
      query,
      { _id:0}
   ).forEach(function(myDocument) {
      table_names.push(myDocument.data);
      console.log(table_names)
      
   });

   var query = { "type": 'writing', "track": "track 1"};
   database.collection("writing_cl").find(
     query,
     { _id:0}
  ).forEach(function(myDocument) {
    track_names.push(myDocument.track);
     console.log(track_names)
     
  });
   

    
   
   var data = {name: table_names,
              track: track_names}
    
    




app.get('/', function(req, res){
    res.render('home_page', {data, data})
})

app.get('/education', function(req, res){
    res.render('education', {data, data})
})

app.get('/writing', function(req, res){

    res.render('writing', {data, data})  
})

app.get('/meditation', function(req, res){
    res.render('meditation', {data, data})
})

app.get('/about', function(req, res){
    res.render('about', {data, data})
})

app.get('/contact', function(req, res){
    res.render('contact', {data, data})
})

app.get('/support', function(req, res){
    res.render('support', {data, data})
})

app.get('/meditation/track1', function(req, res){
    res.render('mtrack1', {data, data})
})

app.listen(process.env.PORT || 5050, ()=>{
    console.log('Server running on port 5050')
})
});
