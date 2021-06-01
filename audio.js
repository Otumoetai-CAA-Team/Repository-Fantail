const express = require('express');
const trackRoute = express.Router();
const multer= require('multer');

const mongodb = require('mongodb')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID

const index = express();
index.use('/track', trackRoute)

const uri = "mongodb+srv://fyeard1449:hcGBE6g5i7ZhuodU@clusterm.zscdl.mongodb.net/test";
let db;
MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var db = db.db("test");
});
    trackRoute.get('/:trackID', (req, res) => {
      try {
        var trackID = new ObjectID(req.params.trackID);
      } catch(err) {
        return res.status(400).json({ message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" }); 
      }
      res.set('content-type', 'audio/mp3');
      res.set('accept-ranges', 'bytes');
    
      let bucket = new mongodb.GridFSBucket(db, {
        bucketName: 'tracks'
      });
    
      let downloadStream = bucket.openDownloadStream(trackID);
    
      downloadStream.on('data', (chunk) => {
        res.write(chunk);
      });
    
      downloadStream.on('error', () => {
        res.sendStatus(404);
      });
    
      downloadStream.on('end', () => {
        res.end();
      });
    });
  

   index.listen(3005, () => {
      console.log("App listening on port 3005!");
    });
