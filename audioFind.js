// Declaring modules used 
const { MongoClient } = require("mongodb");
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
// Our mongodb connection uri string
const uri =
  "mongodb+srv://fyeard1449:hcGBE6g5i7ZhuodU@clusterm.zscdl.mongodb.net/audioDB?retryWrites=true&w=majority";

// This is the id of the audio file that I want to query  
const vartrackID = "60c29115021120107b0187c1" 

// Connects to the database using the uri string
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Runs an asnyc function that will wait before running
async function run() {
  try {
    await client.connect();
    // Declares the variables that will act as database and collection names
    const database = client.db('audioDB');
    const audio = database.collection('fs.files');
    // Query for an audio that has the correct ID
    const query = { _id: ObjectId(vartrackID) };
    const track = await audio.findOne(query);
    // Prins the audio file details 
    console.log(track);
  } finally {
    // Ensures that the client will close when finished or there is an error
    await client.close();
  }
}
run().catch(console.dir);