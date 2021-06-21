const http = require('http');
const mysql = require('mysql');
const express = require('express');
var fs = require('fs');
var path = require('path');

const mongodb = require('mongodb');


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


MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, db) {
    // If an error exists 'throw' -- ie print -- error
    if (err) throw err;

    
    var audio_Database = db.db("audioDB");
    var database = db.db("writing_db");

 
    var query = { "type": 'writing', "track": "track 1"};
    database.collection("writing_cl").find(
      query,
      { _id:0}
   ).forEach(function(myDocument) {
      table_names.push(myDocument.data);
      // Print array with the data type from the database in place
      //console.log(table_names)
      
   });

 
   var query = { "type": 'writing', "track": "track 1"};
   database.collection("writing_cl").find(
     query,
     { _id:0}
  ).forEach(function(myDocument) {
    track_names.push(myDocument.track);
     //console.log(track_names)
     
  });


    
   // Variable to hold the arrays to pass over to the ejs font-end file
   var data = {name: table_names,
              track: track_names}
    
    



// Setting up connection routes between different pages each passing the 'data' variable that holds text from the database
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

    
    let bucket = new mongodb.GridFSBucket(audio_Database);
    let downloadStream =  bucket.openDownloadStreamByName('Gloria Gaynor I Will Survive.mp3');

    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');
    
    downloadStream.on('data', (chunk) => {
      res.write(chunk);
      
    });
  // Error control means that the file was not found
    downloadStream.on('error', () => {
      res.sendStatus(404);
    });
  // Ends the stream to ensure that the gates are properly closed when the audi file ends
    

    
    downloadStream.on('end', () => {
        res.end();
      });
})


// App listens on the port 5050 or the 'process.env.PORT' which is a port that Heroku uses to run our file
app.listen(process.env.PORT || 5050, ()=>{
    console.log('Server running on port 5050')
})
});
