// Declaring modules used 
var express = require('express');
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

// Using audio to hold the express variable
var audio = express();
// Our mongodb connection uri string
const uri = "mongodb+srv://fyeard1449:hcGBE6g5i7ZhuodU@clusterm.zscdl.mongodb.net/CountdownDB?retryWrites=true&w=majority";

// Connecting to the database, using the audioDB to gain access to the audio files
 MongoClient.connect(uri, { useUnifiedTopology: true }, (err, db) => {
   if (err) {
     console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
     process.exit(1);
   }
   var database = db.db("audioDB");
 


// Running a GET /tracks for the server
audio.get('/tracks', (req, res) => {


  res.set('content-type', 'audio/mp3');
  res.set('accept-ranges', 'bytes');
// Creating a bucket to hold the chunks from Grid.fs to then stream over to the front-end server
// This bucket will be held in the audioDB database
  let bucket = new mongodb.GridFSBucket(database);
// Downloading the stream into the bucket of the audio file that is in the database
  let downloadStream =  bucket.openDownloadStreamByName('Gloria Gaynor I Will Survive.mp3');
// 'Writes' the chunks of data to send to the front-end
  downloadStream.on('data', (chunk) => {
    res.write(chunk);
  });
// Error control means that the file was not found
  downloadStream.on('error', () => {
    res.sendStatus(404);
  });
// Ends the stream to ensure that the gates are properly closed
  downloadStream.on('end', () => {
    res.end();
  });
});

});

// The app listens on port 3005
audio.listen(3005, () => {
  console.log("App listening on port 3005!");
});
   
  