const http = require('http');
const mysql = require('mysql');
const express = require('express');
var fs = require('fs');
var path = require('path');

var MongoClient = require('mongodb').MongoClient;
const { table } = require('console');


const uri = process.env.MONGODB_URI || "mongodb+srv://fyeard1449:hcGBE6g5i7ZhuodU@clusterm.zscdl.mongodb.net/test";
//const uri = process.env.MONGODB_URI;

const app = express();
app.use(express.static(path.join(__dirname, '/')));

app.set('view engine', 'ejs')


table_names = []
track_names = []
MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, db) {
    
    if (err) throw err;
    var dbo = db.db("writing_db");

    var query = { "type": 'writing', "track": "track 1"};
    dbo.collection("writing_cl").find(
      query,
      { _id:0}
   ).forEach(function(myDocument) {
      table_names.push(myDocument.data);
      console.log(table_names)
      
   });

   var query = { "type": 'writing', "track": "track 1"};
   dbo.collection("writing_cl").find(
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
