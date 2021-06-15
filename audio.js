

var express = require('express');
const trackRoute = express.Router();
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var audio = express();
const uri = "mongodb+srv://fyeard1449:hcGBE6g5i7ZhuodU@clusterm.zscdl.mongodb.net/audioDB?retryWrites=true&w=majority";


 MongoClient.connect(uri, { useUnifiedTopology: true }, (err, database) => {
   if (err) {
     console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
     process.exit(1);
   }
   var dbo = database.db("audioDB");
 


//  * GET /tracks/:trackID
//  */
audio.get('/tracks', (req, res) => {

  res.set('content-type', 'audio/mp3');
  res.set('accept-ranges', 'bytes');

  let bucket = new mongodb.GridFSBucket(dbo);
  let downloadStream =  bucket.openDownloadStreamByName('typewriter-sound.mp3');

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

});


audio.listen(3005, () => {
  console.log("App listening on port 3005!");
});
   
  